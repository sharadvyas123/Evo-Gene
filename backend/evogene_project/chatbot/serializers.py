# core/serializers.py
from rest_framework import serializers

class ChatInputSerializer(serializers.Serializer):
    # This is the user's text input (e.g., "Analyze this variant...")
    user_query = serializers.CharField(max_length=500) 
    
    # This is the session ID for history (e.g., a Django User ID or session key)
    session_id = serializers.CharField(max_length=100, required=False, default='default_user') 
    
    # Optional field for pre-uploaded/structured data (e.g., a dictionary of diabetes metrics)
    patient_data = serializers.JSONField(required=False, default=dict)