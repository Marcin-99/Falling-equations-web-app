from django.urls import reverse, resolve


class TestUrls:

    def test_home_url(self):
        path = reverse('falling-equations-home')
        assert resolve(path).view_name == 'falling-equations-home'

    def test_players_url(self):
        path = reverse('falling-equations-players')
        assert resolve(path).view_name == 'falling-equations-players'

    def test_about_url(self):
        path = reverse('falling-equations-about')
        assert resolve(path).view_name == 'falling-equations-about'

    def test_save_url(self):
        path = reverse('falling-equations-save')
        assert resolve(path).view_name == 'falling-equations-save'