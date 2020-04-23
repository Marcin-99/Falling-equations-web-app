from django.test import RequestFactory
from django.urls import reverse
from equations_generator.views import generate_equation, generator
from django.test import TestCase


class TestViews(TestCase):

    @classmethod
    def setUpClass(cls):
        super(TestViews, cls).setUpClass()
        cls.factory = RequestFactory()

    def test_generate_equation_unauthenticated(self):
        path = reverse('equation', kwargs={'n': 2})
        request = self.factory.get(path)
        response = generate_equation(request)
        assert response.status_code == 200

    def test_generator_unauthenticated(self):
        path = reverse('generator')
        request = self.factory.get(path)
        response = generator(request)
        assert response.status_code == 200