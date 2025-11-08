from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout


def register_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        
        if password != confirm_password:
            messages.error(request, "Passwords do not match!")
            return redirect('register')

        
        if User.objects.filter(username=email).exists():
            messages.error(request, "Email already registered!")
            return redirect('register')

        
        user = User.objects.create_user(
            username=email,  
            email=email,
            password=password,
            first_name=name
        )
        user.save()
        messages.success(request, "Registration successful! You can now log in.")
        return redirect('login')

    return render(request, 'register.html')


def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, f"Welcome, {user.first_name}!")
            return redirect('home')  
        else:
            messages.error(request, "Invalid credentials!")
            return redirect('login')

    return render(request, 'login.html')


def logout_view(request):
    logout(request)
    messages.info(request, "You’ve been logged out.")
    return redirect('login')
