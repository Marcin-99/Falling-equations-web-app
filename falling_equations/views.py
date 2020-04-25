from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView
from .models import Game
import json
import operator


@login_required
def home(request):
    return render(request, 'falling_equations/home.html')


class GamesView(ListView):
    model = Game
    template_name = 'falling_equations/players.html'
    context_object_name = 'games'
    paginate_by = 5

    def get_queryset(self):
        data = []
        users = User.objects.all()

        for user in users:
            games = Game.objects.filter(author=user).order_by('-score')
            if games:
                data.append(games[0])

        data = sorted(data, key=operator.attrgetter("score"), reverse=True)
        if len(data) > 50:
            data = data[:50]

        return data


def about(request):
    return render(request, 'falling_equations/about.html')


@login_required
def save_game(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        Game.objects.create(author=request.user, level=data['level'],
                            score=data['score'], last_equation=data['last_equation'])
        return HttpResponse(status=201)
    else:
        return HttpResponse(status=200)