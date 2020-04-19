from django.shortcuts import render
from django.views.generic import CreateView
from .models import Game


def home(request):
    return render(request, 'falling_equations/home.html')


def players(request):
    return render(request, 'falling_equations/players.html')


def about(request):
    return render(request, 'falling_equations/about.html')


class GameCreateView(CreateView):
    model = Game
    fields = ['level', 'score', 'last_equation']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)