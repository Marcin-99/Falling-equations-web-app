from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Game
import json
import operator


def home(request):
    return render(request, 'falling_equations/home.html')


def players(request):
    data = []
    users = User.objects.all()

    for user in users:
        games = Game.objects.filter(author=user).order_by('-score')
        if games:
            data.append(games[0])

    data = sorted(data, key=operator.attrgetter("score"), reverse=True)
    if len(data) > 20:
        data = data[:20]

    context = {
        'games': data
    }

    return render(request, 'falling_equations/players.html', context)


def about(request):
    return render(request, 'falling_equations/about.html')


def save_game(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        Game.objects.create(author=request.user, level=data['level'],
                            score=data['score'], last_equation=data['last_equation'])

    return render(request, 'falling_equations/about.html')