# brain_tumor/urls.py
from django.urls import path
from .views import BrainTumorAnalyzeView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    # Assuming project urls are routed to /api/brain/
    # The final endpoint is: /api/brain/analyze/
    path('brain-tumor/analysis/', BrainTumorAnalyzeView.as_view(), name='brain-scan-analyze'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)