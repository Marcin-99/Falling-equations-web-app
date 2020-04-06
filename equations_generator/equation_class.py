from equations_generator.utilities import top, last, is_int
import random

class EquationGenerator:
    def __init__(self, num_of_arguments):
        self.equation = []
        self.Reverse_Polish_Notation_equation = []
        self.solution = ""
        self.num_of_arguments = num_of_arguments


    def draw_chars(self):
        chars_list = []
        parenthesis_list = []

        for i in range(self.num_of_arguments):
            scope = random.randrange(26)
            if scope >= 0 and scope < 4:
                char = "+"
            if scope >= 4 and scope < 8:
                char = "-"
            if scope >= 8 and scope < 12:
                char = "*"
            if scope >= 12 and scope < 16:
                char = "/"
            if scope == 16 or scope == 17:
                char = "^"
            if scope > 17 and scope < 26:
                if last(chars_list, i) != ")" and last(chars_list, i) != "(" and i < self.num_of_arguments - 2:
                    if top(parenthesis_list) == "(":
                        char = ")"
                    else:
                        char = "("
                    parenthesis_list.append(char)
                else:
                    scope_next_attempt = random.randrange(5)
                    if scope_next_attempt == 0:
                        char = "+"
                    if scope_next_attempt == 1:
                        char = "-"
                    if scope_next_attempt == 2:
                        char = "*"
                    if scope_next_attempt == 3:
                        char = "/"
                    if scope_next_attempt == 4:
                        char = "^"
            if top(parenthesis_list) == "(" and i == self.num_of_arguments - 1:
                char = ")"
            chars_list.append(char)

        return chars_list


    def draw_numbers(self, num):
        num_list = []
        for i in range(num):
            num_list.append(random.randrange(1, 10))

        return num_list


    def create_equation(self, char_list, num_list):
        for char in char_list:
            if (char == "+" or char == "-" or char == "*" or char == "/" or char == "^") and top(self.equation) != ")":
                self.equation.append(top(num_list))
                num_list.pop()
                self.equation.append(char)
            if (char == "+" or char == "-" or char == "*" or char == "/" or char == "^") and top(self.equation) == ")":
                self.equation.append(char)
            if char == ")":
                self.equation.append(top(num_list))
                num_list.pop()
                self.equation.append(char)
            if char == "(":
                self.equation.append(char)
        if top(num_list) != None:
            self.equation.append(top(num_list))

        for i in range(len(self.equation)):
            if self.equation[i - 1] == "^" and self.equation[i] != "(" and self.equation[i] != ")" and is_int(self.equation[i] > 3):
                self.equation[i] = random.randrange(4)
            if self.equation[i] == "^" and self.equation[i] != "(" and self.equation[i] != ")" and is_int(self.equation[i - 1]) > 5:
                self.equation[i - 1] = random.randrange(3, 6)

        self.equation.append("=")


    def generate_equation(self):
        char_list = self.draw_chars()

        parenthesis_num = 0
        for char in char_list:
            if char == ")" or char == "(":
                parenthesis_num += 1

        num_list = self.draw_numbers(self.num_of_arguments + 1 - parenthesis_num)
        self.create_equation(char_list, num_list)


    def Reverse_Polish_Notation_algorithm(self):
        stack = []
        output = []

        for element in self.equation:
            if is_int(element) == True:
                output.append(element)
            if element == "+" or element == "-":
                if top(stack) == "+" or top(stack) == "-" or top(stack) == "*" or top(stack) == "/" or top(stack) == "^":
                    while top(stack) == "+" or top(stack) == "-" or top(stack) == "*" or top(stack) == "/" or top(stack) == "^":
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

        self.Reverse_Polish_Notation_equation = output


    def compute_Reverse_Polish_Notation(self):
        output = []
        a = 0
        b = 0

        for element in self.Reverse_Polish_Notation_equation:
            if is_int(element) == True:
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

        self.solution = output[0]
        self.equation.append(output[0])


    def check_solution_after_deleting_parentheses(self):
        saved_solution = self.solution
        saved_equation = self.equation.copy()
        have_parentheses = False

        print(saved_equation)

        for element in self.equation:
            if element == "(" or element == ")":
                self.equation.remove(element)
                have_parentheses = True

        self.Reverse_Polish_Notation_algorithm()
        self.compute_Reverse_Polish_Notation()

        if self.solution == saved_solution and have_parentheses:
            self.solution = saved_solution
            self.equation = saved_equation
            self.equation.pop()
            return True
        else:
            self.solution = saved_solution
            self.equation = saved_equation
            self.equation.pop()
            return False


    def handle_exceptions(self, min_value, max_value):
        if self.solution >= min_value and self.solution <= max_value and int(self.solution) == float(self.solution) and\
                self.check_solution_after_deleting_parentheses() == False:
            return True
        else:
            return False