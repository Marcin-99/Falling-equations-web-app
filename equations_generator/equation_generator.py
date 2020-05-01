import random
from .utilities import top, last, change_for_int
from .reverse_polish_notation_algorithm import reverse_polish_notation_algorithm as rpn_algorithm, \
    compute_reverse_polish_notation as compute_rpn

'''
Class where all algorithms work togetherer to get logically complex equation.
The most unhandy cases are covered, such as:
- big numbers after power char (^)
- logic for putting parentheses in right places
- reroll whenever parentheses don't have an impact for a final solution
There is one uncovered case:
- sometimes solution for part of a equation is so small, that program will not notice it. Example:
1/(9*9)^3 will be evaluated as 0.
'''


class EquationGenerator:

    def __init__(self, num_of_arguments, min_value, max_value):
        self._num_of_arguments = num_of_arguments
        self._min_value = min_value
        self._max_value = max_value
        self.equation = []
        self.reverse_polish_notation_equation = []
        self.equation_string = ""
        self.solution = ""

    def generate_equation(self):
        char_list = self.draw_chars

        parenthesis_num = 0
        for char in char_list:
            if char == ")" or char == "(":
                parenthesis_num += 1

        num_list = self.draw_numbers(self._num_of_arguments + 1 - parenthesis_num)
        self.create_equation(char_list, num_list)

    @property
    def draw_chars(self):
        chars_list = []
        parenthesis_list = []

        for i in range(self._num_of_arguments):
            scope = random.randrange(26)
            if 0 <= scope < 4:
                char = "+"
            if 4 <= scope < 8:
                char = "-"
            if 8 <= scope < 12:
                char = "*"
            if 12 <= scope < 16:
                char = "/"
            if scope == 16 or scope == 17:
                char = "^"
            if 17 < scope < 26:

                if last(chars_list, i) != ")" and last(chars_list, i) != "(" and i < self._num_of_arguments - 2:
                    char = ")" if top(parenthesis_list) == "(" else "("
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
            if top(parenthesis_list) == "(" and i == self._num_of_arguments - 1:
                char = ")"
            chars_list.append(char)

        return chars_list

    @staticmethod
    def draw_numbers(num):
        num_list = [random.randrange(1, 10) for _ in range(num)]
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
        if top(num_list) is not None:
            self.equation.append(top(num_list))

        for i in range(len(self.equation)):
            if self.equation[i - 1] == "^" and self.equation[i] != "(" and self.equation[i] != ")" and change_for_int(
                    self.equation[i]) > 3:
                self.equation[i] = random.randrange(4)
            if self.equation[i] == "^" and self.equation[i] != "(" and self.equation[i] != ")" and change_for_int(
                    self.equation[i - 1]) > 5:
                self.equation[i - 1] = random.randrange(3, 6)

        self.equation.append("=")

    def check_solution_after_deleting_parentheses(self):
        saved_solution = self.solution
        saved_equation = self.equation.copy()
        have_parentheses = False

        for element in self.equation:
            if element == "(" or element == ")":
                self.equation.remove(element)
                have_parentheses = True

        self.reverse_polish_notation_equation = rpn_algorithm(self.equation)
        self.solution = compute_rpn(self.reverse_polish_notation_equation)

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

    def handle_exceptions(self):
        if self.solution in range(self._min_value, self._max_value) and int(self.solution) == float(self.solution) and \
                self.check_solution_after_deleting_parentheses() is False:
            return True
        else:
            return False

    def create_equation_string(self):
        for char in self.equation:
            self.equation_string += str(char)