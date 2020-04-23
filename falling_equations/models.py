from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import make_aware
from django.urls import reverse
import datetime



class Game(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    level = models.IntegerField()
    score = models.IntegerField()
    last_equation = models.CharField(max_length=63)
    date_played = models.DateTimeField(default=make_aware(datetime.datetime.now()))

    def get_absolute_url(self):
        return reverse('profile')

