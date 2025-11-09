from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .evo_service import evo_graph, memory  # don't import twice
from .serializers import ChatInputSerializer
import json

class EvoGeneChatView(APIView):
    """
    API endpoint to interface with the Evo Gene LangGraph.
    Manages state/history using session_id and PostgresSaver.
    """

    def post(self, request, *args, **kwargs):
        # 1️⃣ Validate Input
        serializer = ChatInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        validated_data = serializer.validated_data
        session_id = validated_data.get('session_id', 'default_user')  # fallback session key
        user_query = validated_data['user_query']
        patient_data = validated_data.get('patient_data', {})

        # 2️⃣ Initial state for LangGraph
        initial_state = {
            "user_query": user_query,
            "data_type": "QUERY",
            "patient_data": patient_data,
            "model_result": "",
            "final_report": "",
            "report_history": {
            "dna_report": "",
            "brain_report": "",
            "diabetes_report": ""
        },  
            "error": ""
        }

        try:
            # 3️⃣ Run the LangGraph
            result = evo_graph.invoke(
                initial_state,
                config={"configurable": {"thread_id": session_id, "checkpoint": memory}},
            )

            # 4️⃣ Clean up the response (convert non-serializable objects)
            report = result.get("final_report", "No report generated.")
            history_state = result.get("report_history", [])

            # If the report_history is something weird (like a context), make it serializable
            if not isinstance(history_state, (dict, list, str)):
                try:
                    history_state = str(history_state)
                except Exception:
                    history_state = "Unserializable history object"

            response_data = {
                "report": report,
                "history_state": history_state,
                "status": "Success" if not result.get("error") else "Error",
                "error_message": result.get("error", None),
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"[ERROR] /api/chat/ failed: {e}")
            return Response(
                {
                    "error": "Internal Server Error during graph execution",
                    "details": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
