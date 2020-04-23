from django.urls import reverse, resolve


class TestUrls:

    def test_detail_url(self):
        path = reverse('falling-equations-home')
        assert resolve(path).view_name == 'falling-equations-home'