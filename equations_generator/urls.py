from django.urls import path
from . import views

urlpatterns = [
    path('/equation', views.generate_equation, name='equation'),
]