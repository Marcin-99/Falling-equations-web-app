from equations_generator.generator_loop import generator_loop


class TestGenerator():

    def test_generator_loop(self):
        example_n = 5
        example_min = -100
        example_max = 100
        example_output = generator_loop(example_n, example_min, example_max)
        assert example_output._num_of_arguments == example_n
        assert example_min <= example_output.solution <= example_max
