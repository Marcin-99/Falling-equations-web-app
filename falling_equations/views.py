from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from .models import Game
import json


def home(request):
    return render(request, 'falling_equations/home.html')


def players(request):
    return render(request, 'falling_equations/players.html')


def about(request):
    return render(request, 'falling_equations/about.html')


def save_game(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        Game.objects.create(author=request.user, level=data['level'],
                                   score=data['score'], last_equation=data['last_equation'])


    return render(request, 'falling_equations/about.html')