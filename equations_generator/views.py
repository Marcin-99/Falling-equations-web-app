from django.shortcuts import render
from django.http import JsonResponse
from . import utilities_for_equations_generator as utilities


def generate_equation(request):
    N=20
    while True:
        try:
            rownanie = utilities.generuj_rownanie(N)
            rownanieONP = utilities.zamiana_na_ONP(rownanie)
            wynik = utilities.obliczanie_ONP(rownanieONP)
            if wynik > -50 and wynik < 50 and int(wynik) == wynik and utilities.sprawdz_bez_nawiasow(rownanie, wynik) == False:
                break
        except OverflowError:
            continue
        except ZeroDivisionError:
            continue
        except TypeError:
            continue

    rownanie = list(map(str, rownanie))
    rownanie.append(str(wynik))

    return JsonResponse({'results': rownanie})