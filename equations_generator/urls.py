from django.urls import path
from . import views

urlpatterns = [
    path('/n=<int:n>', views.generate_equation, name='equation'),
    path('/generator', views.generator, name='generator'),
]