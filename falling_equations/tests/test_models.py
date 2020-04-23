from mixer.backend.django import mixer
import pytest


"""if something bad happens if 'date_played' field, this test will catch this."""
@pytest.mark.django_db
class TestModels:
    def tests_get_absolute_url(self):
        game = mixer.blend('falling_equations.Game')
        assert game