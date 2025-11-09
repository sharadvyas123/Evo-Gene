# core/evo_service.py
import os
import json
import time
from typing import TypedDict, Union, Dict
from langgraph.graph import StateGraph, END
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import requests


# --- LangChain/Gemini Imports ---
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
# from langchain_community.chat_models import ChatGoogleGenerativeAI # Using community for full compatibility

# --- Persistence Imports (PostgreSQL) ---
from langgraph.checkpoint.postgres import PostgresSaver 
# NOTE: Ensure 'pip install psycopg2-binary langchain-community' is done.

# --- Domain/ML Imports ---
import pandas as pd
import joblib 
# NOTE: Assume 'diabetes_lgbm_pipeline.pkl' is loadable by Django/Gunicorn process.

# Load environment variables (for LLM Key and EVO Endpoint)
load_dotenv() 

# --- A. Definitions ---

# 1. Pydantic Schema for DNA Input
class EvoPayloadSchema(BaseModel):
    """Structured input for the Evo Gene variant analysis model."""
    variant_position: int = Field(description="The genomic position of the variant (e.g., 43119628).")
    alternative: str = Field(description="The alternative allele, a single nucleotide (e.g., 'G').")
    genome: str = Field(description="The genome reference assembly (e.g., 'hg38').")
    chromosome: str = Field(description="The chromosome name (e.g., 'chr12').")

# 2. Graph State
class ReportHistory(TypedDict):
    dna_report: str
    brain_report: str
    diabetes_report: str

class GraphState(TypedDict):
    """Represents the state of our graph."""
    user_query: str                          
    data_type: str                           
    patient_data: Union[str, Dict]           
    model_result: str                        
    final_report: str                        
    report_history: ReportHistory            
    error: str


# 3. LLM Setup (Configuration)
# Use the correct model name for Gemini 2.0 Flash
llm = ChatGoogleGenerativeAI(model="models/gemini-2.0-flash", temperature=0.1) 


# --- B. Node Definitions ---

def query_to_json_node(state: GraphState):
    """Uses Gemini to extract structured DNA payload from natural language query."""
    llm_structured = llm.with_structured_output(EvoPayloadSchema)
    system_prompt = (
        "You are a genomic data extraction specialist. Your task is to extract "
        "the exact genomic variant details (position, alternative allele, genome, and chromosome) "
        "from the user's query and return them STRICTLY as a JSON object matching the schema."
    )
    
    try:
        messages = [SystemMessage(content=system_prompt), HumanMessage(content=state["user_query"])]
        structured_payload_obj = llm_structured.invoke(messages)
        # Use model_dump() for Pydantic V2 compatibility
        structured_payload = structured_payload_obj.model_dump() 
        
        return {"patient_data": structured_payload, "error": "", "data_type": "DNA_Analysis"}
    
    except Exception as e:
        return {"patient_data": None, "error": f"JSON Extraction Error: {e}"}


def call_evo_model(state: GraphState):
    """Node to send structured DNA data to the remote Evo Model using a single, long timeout."""
    evo_endpoint = os.getenv("EVO2_END_POINT") 
    payload = state['patient_data']
    SINGLE_TIMEOUT_SEC = 90 # Generous timeout for 40s cold start
    
    if not evo_endpoint:
        error_msg = "ERROR: EVO2_END_POINT environment variable is not set."
        return {"model_result": "", "error": error_msg}
        
    try:
        response = requests.post(
            evo_endpoint, 
            json=payload, 
            headers={"Content-Type": "application/json"},
            timeout=SINGLE_TIMEOUT_SEC
        ) 
        response.raise_for_status()
        
        result_json = response.json()
        model_result = json.dumps(result_json, indent=2)
        
        return {"model_result": model_result, "error": ""}
        
    except requests.exceptions.Timeout:
        error_msg = f"Modal API Request Timed Out after {SINGLE_TIMEOUT_SEC}s. Server is offline/slow."
        return {"model_result": "", "error": error_msg}
        
    except requests.exceptions.RequestException as e:
        error_msg = f"Network/HTTP Error calling Modal Evo Model: {e}"
        return {"model_result": "", "error": error_msg}
    except Exception as e:
        error_msg = f"Unexpected Error during Evo Model call: {e}"
        return {"model_result": "", "error": error_msg}


def call_brain_tumor_model(state: GraphState):
    """Node for Brain Tumor analysis (Placeholder)."""
    # NOTE: You would load and preprocess the CT image here.
    try:
        result = "CT Scan classified: Glioma detected with 85% confidence."
        return {"model_result": result, "error": "", "data_type": "Brain_Tumor_Analysis"}
    except Exception as e:
        return {"model_result": "", "error": f"Brain Tumor Model Error: {e}"}


def call_diabetes_analysis(state: GraphState):
    """Node for Diabetes Analysis (LGBM Model)."""
    # NOTE: Assuming your pipeline file is available to the Django process
    try:
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        MODEL_PATH = os.path.join(BASE_DIR, 'models', 'diabetes_lgbm_ct_pipeline.pkl')
        pipeline = joblib.load(MODEL_PATH)
        
        # Ensure input data matches the LGBM pipeline's expected format
        input_data = pd.DataFrame([state['patient_data']], 
                                  columns=['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 
                                           'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'])
        
        prediction = pipeline.predict(input_data)[0]
        prob = pipeline.predict_proba(input_data)[0].tolist()
        
        result = f"Diabetes Prediction: {'Positive' if prediction == 1 else 'Negative'}. Probability: {prob[1]:.2f}"
        return {"model_result": result, "error": "", "data_type": "Diabetes_Analysis"}
    except Exception as e:
        return {"model_result": "", "error": f"Diabetes Model Error: {e}"}

def generate_final_report(state: GraphState):
    """Node to use Gemini LLM to synthesize model results and update history."""
    analysis_type = state["data_type"]

    # ✅ Auto-fix bad report_history
    if not isinstance(state.get("report_history"), dict):
        state["report_history"] = {
            "dna_report": "",
            "brain_report": "",
            "diabetes_report": ""
        }

    if state["error"]:
        final_report = f"An error occurred during {analysis_type} analysis: {state['error']}"
        new_history = state["report_history"]
    else:
        system_prompt = (
            f"You are the Evo Gene AI Assistant. Generate a comprehensive, "
            f"professional, and patient-friendly health report for a {analysis_type} analysis. "
            "Synthesize the raw model result into clear findings, risks, and actionable next steps."
        )
        llm_input = f"Raw Model Result:\n{state['model_result']}\n\nGenerate a detailed, patient-friendly report."
        
        try:
            messages = [SystemMessage(content=system_prompt), HumanMessage(content=llm_input)]
            response = llm.invoke(messages)
            final_report = response.content
            
            new_history = state["report_history"].copy()
            if "DNA" in analysis_type.upper():
                new_history['dna_report'] = final_report
            elif "BRAIN" in analysis_type.upper():
                new_history['brain_report'] = final_report
            elif "DIABETES" in analysis_type.upper():
                new_history['diabetes_report'] = final_report
            else:
                new_history['chat_report'] = final_report  # fallback

        except Exception as e:
            final_report = f"LLM Synthesis Error: {e}"
            new_history = state["report_history"]

    return {"final_report": final_report, "report_history": new_history}

def route_data(state: GraphState):
    """Conditional edge to route the input data to the correct preprocessing/model."""
    query = state["user_query"].upper()
    
    if "DNA" in query or "VARIANT" in query or "EVO" in query:
        return "query_to_json"
    elif "CT" in query or "BRAIN" in query or "TUMOR" in query:
        return "brain_tumor_model"
    elif "DIABETES" in query or "GLUCOSE" in query or "INSULIN" in query:
        return "diabetes_analysis"
    else:
        return "generate_report" 


# --- C. Build and Export the Graph ---

def build_evo_graph():
    workflow = StateGraph(GraphState)

    # 1. Nodes
    workflow.add_node("router_node", lambda state: state) # Entry Node
    workflow.add_node("query_to_json", query_to_json_node) 
    workflow.add_node("evo_model", call_evo_model)
    workflow.add_node("brain_tumor_model", call_brain_tumor_model)
    workflow.add_node("diabetes_analysis", call_diabetes_analysis)
    workflow.add_node("generate_report", generate_final_report)
    
    # 2. Edges
    workflow.set_entry_point("router_node")
    workflow.add_conditional_edges("router_node", route_data, 
        {"query_to_json": "query_to_json", "brain_tumor_model": "brain_tumor_model", 
         "diabetes_analysis": "diabetes_analysis", "generate_report": "generate_report"})
    
    workflow.add_edge("query_to_json", "evo_model") 
    workflow.add_edge("evo_model", "generate_report")
    workflow.add_edge("brain_tumor_model", "generate_report")
    workflow.add_edge("diabetes_analysis", "generate_report")
    workflow.add_edge("generate_report", END)

    return workflow.compile()


# --- D. Initialize and Export the Runnable Instance ---

# PostgreSQL DSN configuration based on Django environment variables
PG_DSN = "postgresql+psycopg2://postgres:vaibhav2807@localhost:5432/evogene_db"

# Initialize the PostgresSaver. This requires Django to have configured PG environment variables.
try:
    memory = PostgresSaver.from_conn_string(PG_DSN)
    print("✅ LangGraph persistence initialized using PostgreSQL.")
except Exception as e:
    # IMPORTANT: In production, you would not use MemorySaver as a fallback.
    # You would ensure the PostgreSQL connection is active first.
    from langgraph.checkpoint.memory import MemorySaver
    memory = MemorySaver()
    print(f"❌ WARNING: Failed to connect to PostgreSQL ({e}). Using in-memory store.")


evo_graph = build_evo_graph()