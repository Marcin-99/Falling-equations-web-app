from django.contrib.auth.models import User
from users.models import Profile
from mixer.backend.django import mixer
import pytest


@pytest.mark.django_db
class TestModels:

    def test_profile_model(self):
        author = mixer.blend(User, username="Marcin")
        profile = Profile.objects.get(user_id=1)
        assert profile.user == author
        assert profile.user.username == "Marcin"