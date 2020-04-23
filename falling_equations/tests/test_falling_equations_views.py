from django.test import RequestFactory
from django.urls import reverse
from django.contrib.auth.models import User, AnonymousUser
from falling_equations.views import home, about, save_game, GamesView
from mixer.backend.django import mixer
from django.test import TestCase
import pytest


@pytest.mark.django_db
class TestViews(TestCase):

    @classmethod
    def setUpClass(cls):
        super(TestViews, cls).setUpClass()
        cls.factory = RequestFactory()

    def test_home_authenticated(self):
        path = reverse('falling-equations-home')
        request = self.factory.get(path)
        request.user = mixer.blend(User)
        response = home(request)
        assert response.status_code == 200

    def test_home_unauthenticated(self):
        path = reverse('falling-equations-home')
        request = self.factory.get(path)
        request.user = AnonymousUser()
        response = home(request)
        assert 'login' in response.url

    def test_about(self):
        path = reverse('falling-equations-about')
        request = self.factory.get(path)
        response = about(request)
        assert response.status_code == 200

    def test_save_game(self):
        path = reverse('falling-equations-save')
        request = self.factory.get(path)
        response = save_game(request)
        assert response.status_code == 200