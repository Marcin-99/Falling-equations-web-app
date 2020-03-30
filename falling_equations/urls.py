from django.urls import path
from . import views

urlpatterns = [
    path('home', views.home, name='falling-equations-home'),
    path('players', views.players, name='falling-equations-players'),
]