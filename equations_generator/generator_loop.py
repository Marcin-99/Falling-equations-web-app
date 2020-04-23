from .equation_class import EquationGenerator


def main_loop(n, min_value, max_value):
    while True:
        try:
            generator = EquationGenerator(n, min_value, max_value)
            generator.generate_equation()
            generator.Reverse_Polish_Notation_algorithm()
            generator.compute_Reverse_Polish_Notation()

            if generator.handle_exceptions():
                generator.equation.append(int(generator.solution))
                generator.create_equation_string()
                print(len(generator.equation))
                break
        except:
            continue

    return generator