from django.shortcuts import render
from django.http import JsonResponse
from equations_generator.equation_class import EquationGenerator


def generate_equation(request, n=1):
    min_value = -50
    max_value = 50

    while True:
        try:
            generator = EquationGenerator(n)
            generator.generate_equation()
            generator.Reverse_Polish_Notation_algorithm()
            generator.compute_Reverse_Polish_Notation()

            if generator.handle_exceptions(min_value, max_value) == True:
                generator.equation.append(generator.solution)
                break
        except:
            continue

    return JsonResponse({'equation': generator.equation})