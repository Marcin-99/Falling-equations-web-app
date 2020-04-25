from .equation_class import EquationGenerator


def main_loop(n, min_value, max_value):
    while True:
        try:
            generator = EquationGenerator(n, min_value, max_value)
            generator.generate_equation()
            generator.reverse_polish_notation_algorithm()
            generator.compute_reverse_polish_notation()

            if generator.handle_exceptions():
                generator.equation.append(int(generator.solution))
                generator.create_equation_string()
                break
        except:
            continue

    return generator