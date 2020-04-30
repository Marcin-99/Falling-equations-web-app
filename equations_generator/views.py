from django.shortcuts import render
from django.http import JsonResponse
from django.contrib import messages
from .forms import GeneratorForm
from .generator_loop import main_loop


def generate_equation(request, n=1):
    min_value = -50
    max_value = 50
    generator = main_loop(n, min_value, max_value)
    data = {'equation list': generator.equation, 'equation string': generator.equation_string}

    return JsonResponse({'data': data})


def generator(request):
    maybe_post = None if not request.POST else request.POST
    form = GeneratorForm(maybe_post)

    if form.is_valid():
        n = form.cleaned_data.get('num_of_operands')
        min_value = form.cleaned_data.get('min')
        max_value = form.cleaned_data.get('max')

        if min_value >= max_value:
            messages.info(request, f'Minimum solution value can not be greater or equal to maximum solution value.')
        else:
            generator = main_loop(n, min_value, max_value)
            return render(request, 'equations_generator/equation.html', {'equation': generator.equation_string})

    return render(request, 'equations_generator/generator.html', {'form': form})