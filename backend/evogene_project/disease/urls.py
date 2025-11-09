# disease/urls.py
from django.urls import path
from .views import predict_diabetes

urlpatterns = [
    path('diabetes/predict/', predict_diabetes, name='predict_diabetes'),
]
