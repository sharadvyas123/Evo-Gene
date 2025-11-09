from rest_framework import serializers
from .models import DiabetesPrediction

class DiabetesPredictionSerializer(serializers.ModelSerializer):
    blood_pressure_systolic = serializers.FloatField(write_only=True)
    blood_pressure_diastolic = serializers.FloatField(write_only=True)
    blood_pressure = serializers.FloatField(read_only=True)

    class Meta:
        model = DiabetesPrediction
        fields = [
            'glucose',
            'blood_pressure_systolic',
            'blood_pressure_diastolic',
            'blood_pressure',  # computed internally
            'skin_thickness',
            'insulin',
            'bmi',
            'age',
            'pregnancies',
            'diabetes_pedigree_function'
        ]
