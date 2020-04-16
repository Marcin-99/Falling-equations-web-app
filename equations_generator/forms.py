from django import forms
from django.core.validators import MinValueValidator, MaxValueValidator


class GeneratorForm(forms.Form):
    min = forms.IntegerField(label="Minimum solution value", validators=[MinValueValidator(-1000000), MaxValueValidator(1000000)])
    max = forms.IntegerField(label="Maximum solution value", validators=[MinValueValidator(-1000000), MaxValueValidator(1000000)])
    num_of_operands = forms.IntegerField(label="Number of operands", validators=[MinValueValidator(0), MaxValueValidator(30)])