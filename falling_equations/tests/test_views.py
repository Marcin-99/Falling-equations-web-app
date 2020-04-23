from django.test import RequestFactory
from django.urls import reverse
from django.contrib.auth.models import User, AnonymousUser
from falling_equations.views import home
from mixer.backend.django import mixer
import pytest


@pytest.mark.django_db
class TestViews:

    def test_home_authenticated(self):
        path = reverse('falling-equations-home')
        request = RequestFactory().get(path)
        request.user = mixer.blend(User)
        response = home(request)
        assert response.status_code == 200

    def test_home_unauthenticated(self):
        path = reverse('falling-equations-home')
        request = RequestFactory().get(path)
        request.user = AnonymousUser()
        response = home(request)
        assert 'login' in response.url

    def test_about(self):
        path = reverse('falling-equations-about')
        request = RequestFactory().get(path)
        request.user = AnonymousUser()
        response = home(request)
        assert 'about' in response.url