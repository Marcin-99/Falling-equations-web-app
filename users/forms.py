from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        '''Tu dajemy znać programowi, że po zapisaniu formy, dane z niej pochodzące mają zapisać się w modelu User.'''
        model = User
        fields = ['username', 'email', 'password1', 'password2']