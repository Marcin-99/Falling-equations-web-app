from django.views.decorators.http import require_http_methods
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib import messages
from .forms import GeneratorForm
from .generator_loop import generator_loop


@require_http_methods(["GET"])
def generate_equation(request, n=1):
    min_value = -50
    max_value = 50
    generator_obj = generator_loop(n, min_value, max_value)
    data = {'equation list': generator_obj.equation, 'equation string': generator_obj.equation_string}

    return JsonResponse({'data': data})


@require_http_methods(["GET", "POST"])
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
            generator_obj = generator_loop(n, min_value, max_value)
            return render(request, 'equations_generator/equation.html', {'equation': generator_obj.equation_string})

    return render(request, 'equations_generator/generator.html', {'form': form})