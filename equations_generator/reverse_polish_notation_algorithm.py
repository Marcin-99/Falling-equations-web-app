from .utilities import top


def reverse_polish_notation_algorithm(equation):
    stack = []
    output = []

    for element in equation:
        if type(element) is int:
            output.append(element)
        if element == "+" or element == "-":
            if top(stack) == "+" or top(stack) == "-" or top(stack) == "*" or top(stack) == "/" or top(stack) == "^":
                while top(stack) == "+" or top(stack) == "-" or top(stack) == "*" or top(stack) == "/" \
                        or top(stack) == "^":
                    output.append(top(stack))
                    stack.pop()
            stack.append(element)
        if element == "*" or element == "/":
            if top(stack) == "*" or top(stack) == "/" or top(stack) == "^":
                while top(stack) == "*" or top(stack) == "/" or top(stack) == "^":
                    output.append(top(stack))
                    stack.pop()
            stack.append(element)
        if element == "^":
            stack.append(element)
        if element == "=":
            while top(stack) == "+" or top(stack) == "-" or top(stack) == "*" or top(stack) == "/" or top(stack) == "^":
                output.append(top(stack))
                stack.pop()
        if element == "(":
            stack.append(element)
        if element == ")":
            while top(stack) != "(":
                output.append(top(stack))
                stack.pop()
            stack.pop()

    return output


def compute_reverse_polish_notation(equation):
    output = []

    for element in equation:
        if type(element) is int:
            output.append(float(element))
        if element == "+":
            a = top(output)
            output.pop()
            b = top(output)
            output.pop()
            output.append(b + a)
        if element == "-":
            a = top(output)
            output.pop()
            b = top(output)
            output.pop()
            output.append(b - a)
        if element == "*":
            a = top(output)
            output.pop()
            b = top(output)
            output.pop()
            output.append(b * a)
        if element == "/":
            a = top(output)
            output.pop()
            b = top(output)
            output.pop()
            output.append(b / a)
        if element == "^":
            a = top(output)
            output.pop()
            b = top(output)
            output.pop()
            output.append(pow(b, a))

    return output[0]