import json
import threading
import requests
import time
import uuid
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pydantic import BaseModel, Field, ValidationError
from typing import Literal
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from dotenv import load_dotenv

load_dotenv()

# 🌐 Evo2 model endpoint
EVO2_ENDPOINT_URL = "https://anmol1140w--variant-analysis-evo2-evo2model-analyze-sing-4a3d81.modal.run"

# 🧠 Gemini LLM
llm = ChatGoogleGenerativeAI(model="models/gemini-2.0-flash", temperature=0.2)

# ✅ Pydantic Schema for structured variant data
class VariantInputSchema(BaseModel):
    chromosome: str = Field(..., description="Chromosome, e.g., 'chr12'")
    variant_position: int = Field(..., description="Variant position")
    alternative: str = Field(..., description="Alternative allele")
    genome: Literal["hg38", "hg19"] = Field("hg38", description="Genome build")

# 🗂️ Directory for persistent task results
RESULTS_DIR = os.path.join(os.path.dirname(__file__), "task_results")
os.makedirs(RESULTS_DIR, exist_ok=True)


def save_result(task_id, data):
    """Save result JSON to a file."""
    with open(os.path.join(RESULTS_DIR, f"{task_id}.json"), "w") as f:
        json.dump(data, f)


def load_result(task_id):
    """Load result JSON if exists."""
    file_path = os.path.join(RESULTS_DIR, f"{task_id}.json")
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            return json.load(f)
    return None


# 🧩 Background Worker Function
def background_analysis_task(task_id, user_prompt):
    print(f"🚀 Started background task {task_id}")
    try:
        # STEP 1️⃣ - Extract structured variant data
        system_extract = SystemMessage(content=(
            "You are a DNA variant extractor. Extract variant details as JSON "
            "with keys: chromosome, variant_position, alternative, genome. "
            "Output valid JSON only, no explanations."
        ))
        human_message = HumanMessage(content=user_prompt)
        response = llm.invoke([system_extract, human_message])
        raw_output = response.content.strip()
        print(f"🧬 Gemini Raw Output: {raw_output}")

        # Try parsing Gemini output as JSON
        try:
            extracted = json.loads(raw_output)
        except json.JSONDecodeError:
            import re
            match = re.search(r"\{.*\}", raw_output, re.DOTALL)
            extracted = json.loads(match.group(0)) if match else {}

        # Validate via schema
        extracted_variant = VariantInputSchema(**extracted)
        payload = extracted_variant.model_dump()
        print(f"✅ Extracted Variant JSON: {payload}")

        # STEP 2️⃣ - Call Evo2 Model
        print(f"📤 Sending to Evo2 ({EVO2_ENDPOINT_URL}) with 90s timeout: {payload}")
        evo_response = requests.post(
            EVO2_ENDPOINT_URL,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=90,
        )
        evo_response.raise_for_status()
        evo_result = evo_response.json()
        print(f"✅ Evo2 API Response: {evo_result}")

        # STEP 3️⃣ - Generate a human summary
        summary_prompt = f"""
        Write a clear, short medical summary for this variant analysis.
        Include chromosome, variant, classification, and interpretation.
        Variant Data: {json.dumps(payload)}
        Evo2 Result: {json.dumps(evo_result)}
        """

        summary_response = llm.invoke([
            SystemMessage(content="You are a medical report generator. Respond with one coherent paragraph."),
            HumanMessage(content=summary_prompt),
        ])
        summary_text = summary_response.content.strip()

        # ✅ Store final result persistently
        save_result(task_id, {
            "status": "completed",
            "variant_data": payload,
            "evo2_result": evo_result,
            "summary": summary_text,
        })

        print(f"✅ Task {task_id} completed successfully.")
    except Exception as e:
        print(f"❌ Task {task_id} failed: {e}")
        save_result(task_id, {"status": "error", "error": str(e)})


# 🌐 Route: Start a new analysis
@csrf_exempt
def llm_analysis_router(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    try:
        data = json.loads(request.body)
        user_prompt = data.get("prompt", "").strip()
        if not user_prompt:
            return JsonResponse({"error": "Missing 'prompt'"}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    # Generate unique task ID
    task_id = str(uuid.uuid4())

    # Launch background thread
    threading.Thread(
        target=background_analysis_task,
        args=(task_id, user_prompt),
        daemon=True
    ).start()

    # Respond instantly
    return JsonResponse({
        "task_id": task_id,
        "status": "processing",
        "message": "🧬 Analysis started. Check progress at /api/status/<task_id>/",
    }, status=202)


# 🌐 Route: Check task status
@csrf_exempt
def get_task_status(request, task_id):
    result = load_result(task_id)
    print(f"📡 Checking task {task_id}, found:", result)
    if not result:
        return JsonResponse({"status": "processing"}, status=202)
    return JsonResponse(result, status=200)
