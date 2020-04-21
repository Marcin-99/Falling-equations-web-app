from django.urls import path
from .views import GamesView
from . import views

urlpatterns = [
    path('', views.home, name='falling-equations-home'),
    path('players', GamesView.as_view(), name='falling-equations-players'),
    path('about', views.about, name='falling-equations-about'),
    path('save', views.save_game, name='falling-equations-save'),
]