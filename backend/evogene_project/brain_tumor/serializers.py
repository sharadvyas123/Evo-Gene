# brain_tumor/serializers.py
from rest_framework import serializers

class BrainScanSerializer(serializers.Serializer):
    """Serializer for validating the incoming image upload request."""
    # This field MUST be named 'image' in the client's form data
    image = serializers.ImageField() 
    
    # Optional field to identify the user/session
    session_id = serializers.CharField(max_length=100, required=False)