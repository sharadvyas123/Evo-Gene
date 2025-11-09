# disease/urls.py
from django.urls import path
from .views import llm_analysis_router , get_task_status

urlpatterns = [
    path('chat/', llm_analysis_router, name='Evo-Chat'),
    path("status/<uuid:task_id>/", get_task_status),
]
