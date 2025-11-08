from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='api-register'),
    path('login/', views.login_user, name='api-login'),
    path('logout/', views.logout_user, name='api-logout'),
]
