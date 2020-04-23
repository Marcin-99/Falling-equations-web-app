from django.test import RequestFactory
from django.urls import reverse
from django.contrib.auth.models import User, AnonymousUser
from users.views import register, profile
from mixer.backend.django import mixer
from django.test import TestCase
import pytest


@pytest.mark.django_db
class TestViews(TestCase):

    @classmethod
    def setUpClass(cls):
        super(TestViews, cls).setUpClass()
        cls.factory = RequestFactory()

    def test_register_unauthenticated(self):
        path = reverse('register')
        request = self.factory.get(path)
        request.user = AnonymousUser()
        response = register(request)
        assert response.status_code == 200

    def test_profile_authenticated(self):
        path = reverse('profile')
        request = self.factory.get(path)
        request.user = mixer.blend(User)
        response = profile(request)
        assert response.status_code == 200

    def test_profile_unauthenticated(self):
        path = reverse('profile')
        request = self.factory.get(path)
        request.user = AnonymousUser()
        response = profile(request)
        assert 'login' in response.url