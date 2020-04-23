from equations_generator.utilities import top, last, is_int


class TestViews():

    def test_top(self):
        example_input = [1, 2, 3]
        example_output = top(example_input)
        assert example_output == 3

        example_input = []
        example_output = top(example_input)
        assert example_output == None

    def test_last(self):
        example_input = [1, "two", 3]
        example_output = last(example_input, 2)
        assert example_output == "two"

        example_input = []
        example_output = last(example_input, 1)
        assert example_output == None


    def test_is_int(self):
        example_input = 3
        example_output = is_int(example_input)
        assert example_output == True

        example_input = 3.14
        example_output = is_int(example_input)
        assert example_output == False

        example_input = "three"
        example_output = is_int(example_input)
        assert example_output == False

        example_input = None
        example_output = is_int(example_input)
        assert example_output == False