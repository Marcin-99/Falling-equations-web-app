from django.urls import reverse, resolve


class TestUrls:

    def test_password_reset_confirm_url(self):
        path = reverse('password_reset_confirm', kwargs={'uidb64': 1, 'token': 1})
        assert resolve(path).view_name == 'password_reset_confirm'

    def test_register_url(self):
        path = reverse('register')
        assert resolve(path).view_name == 'register'

    def test_login_url(self):
        path = reverse('login')
        assert resolve(path).view_name == 'login'

    def test_logout_url(self):
        path = reverse('logout')
        assert resolve(path).view_name == 'logout'

    def test_profile_url(self):
        path = reverse('profile')
        assert resolve(path).view_name == 'profile'

    def test_password_reset_url(self):
        path = reverse('password_reset')
        assert resolve(path).view_name == 'password_reset'

    def test_password_reset_done_url(self):
        path = reverse('password_reset_done')
        assert resolve(path).view_name == 'password_reset_done'

    def test_password_reset_complete_url(self):
        path = reverse('password_reset_complete')
        assert resolve(path).view_name == 'password_reset_complete'