from django.urls import reverse, resolve


class TestUrls:

    def test_equation_url(self):
        path = reverse('equation', kwargs={'n': 1})
        assert resolve(path).view_name == 'equation'

    def test_generator_url(self):
        path = reverse('generator')
        assert resolve(path).view_name == 'generator'