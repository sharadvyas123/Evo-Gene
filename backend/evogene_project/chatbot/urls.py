# disease/urls.py
from django.urls import path
from .views import EvoGeneChatView

urlpatterns = [
    path('chat/', EvoGeneChatView.as_view(), name='Evo-Chat'),
]
