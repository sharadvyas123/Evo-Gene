from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class BrainTumorAnalysis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bt_analysis', null=True, blank=True)
    mri_image = models.ImageField(upload_to='uploads/mri_scans/', help_text="Uploaded MRI scan")
    masked_image = models.ImageField(upload_to='uploads/masked_results/', null=True, blank=True, help_text="Generated segmentation mask")
    prediction_label = models.CharField(max_length=100, null=True, blank=True, help_text="Result (Tumor / No Tumor)")
    confidence_score = models.FloatField(null=True, blank=True, help_text="Confidence score (0-1)")
    detected_region = models.TextField(null=True, blank=True, help_text="Optional details like bounding boxes")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"BrainTumorAnalysis - {self.user or 'Guest'} ({self.prediction_label or 'Pending'})"
