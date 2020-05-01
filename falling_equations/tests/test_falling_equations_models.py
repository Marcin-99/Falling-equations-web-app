from mixer.backend.django import mixer
import pytest


"""if something bad happens if 'date_played' field, this test will catch this."""
@pytest.mark.django_db
class TestModels:

    def test_game_model(self):
        game = mixer.blend('falling_equations.Game', score=1450)
        assert game.__str__() == f"Game record with score equal to {game.score}."