from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.base import ContentFile
from django.contrib.auth import get_user_model
from .models import BrainTumorAnalysis
from .utils import analyze_scan   # Your AI function
import io
import traceback

User = get_user_model()

class BrainTumorAnalyzeView(APIView):
    """
    Handles POST requests for brain tumor image analysis:
    1. Accepts FormData image upload.
    2. Passes image to ML model (analyze_scan).
    3. Saves original + result.
    """

    def post(self, request, *args, **kwargs):
        try:
            if 'image' not in request.FILES:
                return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)
            
            image_file = request.FILES['image']
            user = request.user if request.user.is_authenticated else None

            # Run deep learning analysis
            tumor_score, mask_buffer = analyze_scan(image_file)

            # Save DB record
            image_file.seek(0)
            analysis = BrainTumorAnalysis.objects.create(
                user=user,
                mri_image=image_file,
                confidence_score=tumor_score,
                prediction_label="Tumor Detected" if tumor_score > 0.5 else "No Tumor Detected"
            )

            mask_filename = f"mask_{analysis.pk}_{image_file.name}"
            analysis.masked_image.save(mask_filename, ContentFile(mask_buffer.getvalue()))
            
            response_data = {
                "id": analysis.id,
                "prediction_label": analysis.prediction_label,
                "confidence_score": f"{tumor_score:.4f}",
                "masked_image_url": request.build_absolute_uri(analysis.masked_image.url),
                "status": "Analysis Complete ✅"
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            print("[❌ ERROR in BrainTumorAnalyzeView]")
            traceback.print_exc()  # 👈 This prints full error trace in console
            return Response(
                {'error': 'Image Processing Failed', 'details': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        except Exception as e:
            return Response(
                {"error": "Processing Failed", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
