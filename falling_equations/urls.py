from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='falling-equations-home'),
    path('players', views.players, name='falling-equations-players'),
    path('about', views.about, name='falling-equations-about'),
    path('save', views.save_game, name='falling-equations-save'),
]