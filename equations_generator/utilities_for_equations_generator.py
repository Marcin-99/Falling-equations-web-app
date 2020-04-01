import random


def WARUNEK(a):
    if a == ".":
        return True
    else:
        try:
            float(a)
            return True
        except ValueError:
            return False


def top(l):
    try:
        l[-1]
        return l[-1]
    except IndexError:
        return None


def last(tabela,i):
    try:
        tabela[i-1]
        return tabela[i-1]
    except IndexError:
        return None


def losowanie_liczb(ilosc_liczb):   #losowanie liczb do równania
    tabela_liczb = []
    for i in range(ilosc_liczb):
        tabela_liczb.append(random.randrange(1,10))
    return tabela_liczb


def losowanie_znakow(ilosc_znakow):    #losowanie operandów do równania
    tabela_znakow = []
    nawiasy = []
    for i in range(ilosc_znakow):
        zakres = random.randrange(26)      #ustalam prawdopodobieństwo wystąpienia każdego ze znaków, potęgi nie mogą być za często
        if zakres >= 0 and zakres < 4:
            znak = "+"
        if zakres >= 4 and zakres < 8:
            znak = "-"
        if zakres >= 8 and zakres < 12:
            znak = "*"
        if zakres >= 12 and zakres < 16:
            znak = "/"
        if zakres == 16 or zakres == 17:
            znak = "^"
        if zakres > 17 and zakres < 26:
            if last(tabela_znakow,i) != ")" and last(tabela_znakow,i) != "(" and i < ilosc_znakow - 2:
                if top(nawiasy) == "(":
                    znak = ")"
                else:
                    znak = "("
                nawiasy.append(znak)
            else:
                zakres_2 = random.randrange(5)
                if zakres_2 == 0:
                    znak = "+"
                if zakres_2 == 1:
                    znak = "-"
                if zakres_2 == 2:
                    znak = "*"
                if zakres_2 == 3:
                    znak = "/"
                if zakres_2 == 4:
                    znak = "^"
        if top(nawiasy) == "(" and i == ilosc_znakow - 1:
            znak = ")"
        tabela_znakow.append(znak)

    return tabela_znakow


def tworzenie_rownania(znaki,liczby):   #łączenie liczb i operandów w spójną całość
    rownanie = []

    for z in znaki:
        if (z == "+" or z == "-" or z == "*" or z == "/" or z == "^") and top(rownanie) != ")":
            rownanie.append(top(liczby))
            liczby.pop()
            rownanie.append(z)
        if (z == "+" or z == "-" or z == "*" or z == "/" or z == "^") and top(rownanie) == ")":
            rownanie.append(z)
        if z == ")":
            rownanie.append(top(liczby))
            liczby.pop()
            rownanie.append(z)
        if z == "(":
            rownanie.append(z)
    if top(liczby) != None:
        rownanie.append(top(liczby))

    i = 0
    while i < len(rownanie):
        if rownanie[i - 1] == "^" and rownanie[i] != "(" and rownanie[i] != ")" and WARUNEK(rownanie[i] > 3) :
            rownanie[i] = random.randrange(4)
        if rownanie[i] == "^" and rownanie[i] != "(" and rownanie[i] != ")" and WARUNEK(rownanie[i - 1]) > 5:
            rownanie[i - 1] = random.randrange(3,6)
        i += 1

    rownanie.append("=")
    return rownanie


def generuj_rownanie(N):

    tablica_znakow = losowanie_znakow(N)

    nawiasy = 0
    for i in tablica_znakow:
        if i == ")" or i == "(":
            nawiasy += 1

    tablica_liczb = losowanie_liczb(N+1-nawiasy)
    rownanie = tworzenie_rownania(tablica_znakow,tablica_liczb)
    return rownanie


def zamiana_na_ONP(tabela):     #funkcja, która zamienia równanie w normalnej postaci, na równanie w postaci Odwrotnej Notacji Polskiej, aby program był w stanie zachować kolejność działań
    stos = []
    wynik = []
    i = 0

    while i != len(tabela):
        if WARUNEK(tabela[i]) == True:
            wynik.append(tabela[i])
        if tabela[i] == "+" or tabela[i] == "-":
            if top(stos) == "+" or top(stos) == "-" or top(stos) == "*" or top(stos) == "/" or top(stos) == "^":
                while top(stos) == "+" or top(stos) == "-" or top(stos) == "*" or top(stos) == "/" or top(stos) == "^":
                    wynik.append(top(stos))
                    stos.pop()
            stos.append(tabela[i])
        if tabela[i] == "*" or tabela[i] == "/":
            if top(stos) == "*" or top(stos) == "/" or top(stos) == "^":
                while top(stos) == "*" or top(stos) == "/" or top(stos) == "^":
                    wynik.append(top(stos))
                    stos.pop()
            stos.append(tabela[i])
        if tabela[i] == "^":
            stos.append(tabela[i])
        if tabela[i] == "=":
            while top(stos) == "+" or top(stos) == "-" or top(stos) == "*" or top(stos) == "/" or top(stos) == "^":
                wynik.append(top(stos))
                stos.pop()
        if tabela[i] == "(":
            stos.append(tabela[i])
        if tabela[i] == ")":
            while top(stos) != "(":
                wynik.append(top(stos))
                stos.pop()
            stos.pop()
        i+=1

    return wynik


def obliczanie_ONP(tabela):     #funkcja obliczająca równanie w postaci Odwrotnej Notaci Polskiej
    stos = []
    wynik = []
    a = 0
    b = 0
    i = 0

    for i in tabela:
        if WARUNEK(i) == True:
            wynik.append(float(i))
        if i == "+":
            a = top(wynik)
            wynik.pop()
            b = top(wynik)
            wynik.pop()
            wynik.append(b+a)
        if i == "-":
            a = top(wynik)
            wynik.pop()
            b = top(wynik)
            wynik.pop()
            wynik.append(b-a)
        if i == "*":
            a = top(wynik)
            wynik.pop()
            b = top(wynik)
            wynik.pop()
            wynik.append(b*a)
        if i == "/":
            a = top(wynik)
            wynik.pop()
            b = top(wynik)
            wynik.pop()
            wynik.append(b/a)
        if i == "^":
            a = top(wynik)
            wynik.pop()
            b = top(wynik)
            wynik.pop()
            wynik.append(pow(b,a))

    wynik = wynik[0]

    return wynik


def sprawdz_bez_nawiasow(rownanie, wynik):     #funkcja sprawdza, czy wynik równania zawierającego nawiasy byłby taki sam bez tych nawiasów
    czy_zawiera_nawiasy = False
    rownanie_bez_nawiasow = list(rownanie)
    for i in rownanie_bez_nawiasow:
        if i == "(" or i == ")":
            rownanie_bez_nawiasow.remove(i)
            czy_zawiera_nawiasy = True

    rownanie_bez_nawiasow = zamiana_na_ONP(rownanie_bez_nawiasow)
    wynik_2 = obliczanie_ONP(rownanie_bez_nawiasow)

    if wynik_2 == wynik and czy_zawiera_nawiasy == True:
        return True
    else:
        return False