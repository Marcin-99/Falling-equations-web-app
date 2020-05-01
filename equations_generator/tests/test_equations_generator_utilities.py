from equations_generator.utilities import top, last, change_for_int


class TestUtilities():

    def test_top(self):
        example_input = [1, 2, 3]
        example_output = top(example_input)
        assert example_output == 3

        example_input = []
        example_output = top(example_input)
        assert example_output is None

    def test_last(self):
        example_input = [1, "two", 3]
        example_output = last(example_input, 2)
        assert example_output == "two"

        example_input = []
        example_output = last(example_input, 1)
        assert example_output is None

    def test_change_for_int(self):
        example_input = 3
        example_output = change_for_int(example_input)
        assert example_output == 3

        example_input = 3.14
        example_output = change_for_int(example_input)
        assert example_output is None

        example_input = "three"
        example_output = change_for_int(example_input)
        assert example_output is None

        example_input = None
        example_output = change_for_int(example_input)
        assert example_output is None
