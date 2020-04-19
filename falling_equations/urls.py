from django.urls import path
from .views import GameCreateView
from . import views

urlpatterns = [
    path('', views.home, name='falling-equations-home'),
    path('players', views.players, name='falling-equations-players'),
    path('about', views.about, name='falling-equations-about'),
    path('new_game', GameCreateView.as_view(), name='falling-equations-new_game'),
]