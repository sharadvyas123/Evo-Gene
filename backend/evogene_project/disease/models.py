from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class DiabetesPrediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='diabetes_predictions', null=True, blank=True)

    glucose = models.FloatField(help_text="Glucose level in mg/dL")
    blood_pressure_systolic = models.FloatField(help_text="Systolic blood pressure (mm Hg)")
    blood_pressure_diastolic = models.FloatField(help_text="Diastolic blood pressure (mm Hg)")
    skin_thickness = models.FloatField(help_text="Skin thickness (mm)")
    insulin = models.FloatField(help_text="Insulin level (μU/mL)")
    bmi = models.FloatField(help_text="Body Mass Index (kg/m²)")
    age = models.IntegerField(help_text="Age in years")
    pregnancies = models.IntegerField(help_text="Number of pregnancies")
    diabetes_pedigree_function = models.FloatField(help_text="Diabetes pedigree function")

    prediction_result = models.CharField(max_length=50, null=True, blank=True, help_text="Predicted outcome (e.g., Diabetic / Non-diabetic)")
    prediction_probability = models.FloatField(null=True, blank=True, help_text="Prediction probability (0-1)")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"DiabetesPrediction - {self.user} ({self.prediction_result or 'Pending'})"


class BrainTumorAnalysis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='brain_tumor_analyses', null=True, blank=True)

    # File upload
    mri_image = models.ImageField(upload_to='uploads/mri_scans/', help_text="Upload MRI image")

    # Optional ML outputs
    prediction_label = models.CharField(max_length=100, null=True, blank=True, help_text="Predicted result (e.g., Tumor / No Tumor)")
    confidence_score = models.FloatField(null=True, blank=True, help_text="Model confidence (0–1)")
    detected_region = models.TextField(null=True, blank=True, help_text="Region of interest or detected tumor coordinates (optional)")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"BrainTumorAnalysis - {self.user or 'Guest'} ({self.prediction_label or 'Pending'})"
