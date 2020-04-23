from equations_generator.generator_loop import main_loop


class TestViews():

    def test_main_loop(self):
        example_n = 5
        example_min = -100
        example_max = 100
        example_output = main_loop(example_n, example_min, example_max)
        assert example_output.num_of_arguments == example_n
        assert example_output.solution > example_min
        assert example_output.solution < example_max