from django.shortcuts import render
from django.http import HttpResponse


def home(request):
    return render(request, 'falling_equations/home.html')


def players(request):
    return render(request, 'falling_equations/players.html')
