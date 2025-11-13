# chatbot/serializers.py
from rest_framework import serializers

class ChatInputSerializer(serializers.Serializer):
    # User query or prompt (either one should be accepted)
    user_query = serializers.CharField(max_length=500, required=False)
    prompt = serializers.CharField(max_length=500, required=False)
    
    # Optional session ID for tracking user
    session_id = serializers.CharField(max_length=100, required=False, default='default_user')
    
    # Optional structured patient data
    patient_data = serializers.JSONField(required=False, default=dict)

    def validate(self, data):
        # Ensure at least one of user_query or prompt is provided
        if not data.get("user_query") and not data.get("prompt"):
            raise serializers.ValidationError("Either 'user_query' or 'prompt' is required.")
        
        # If only prompt is provided, map it to user_query internally
        if "prompt" in data and not data.get("user_query"):
            data["user_query"] = data["prompt"]
        
        return data
