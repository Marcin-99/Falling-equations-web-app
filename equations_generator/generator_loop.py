from .equation_generator import EquationGenerator
from .reverse_polish_notation_algorithm import reverse_polish_notation_algorithm as rpn_algorithm, \
    compute_reverse_polish_notation as compute_rpn

'''
There whole process of generating equation takes place. Whenever result doesn't meet expectations in 
generator.handle_exceptions(), script will repeat the process.
'''


def generator_loop(n, min_value, max_value):
    while True:
        try:
            generator_obj = EquationGenerator(n, min_value, max_value)
            generator_obj.generate_equation()
            generator_obj.reverse_polish_notation_equation = rpn_algorithm(generator_obj.equation)
            generator_obj.solution = compute_rpn(generator_obj.reverse_polish_notation_equation)
            generator_obj.equation.append(generator_obj.solution)

            if generator_obj.handle_exceptions():
                generator_obj.equation.append(int(generator_obj.solution))
                generator_obj.create_equation_string()
                break

        except (OverflowError, ZeroDivisionError, TypeError):
            continue

    return generator_obj
