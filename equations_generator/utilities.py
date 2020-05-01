def top(list):
    try:
        list[-1]
        return list[-1]
    except IndexError:
        return None


def last(list, i):
    try:
        list[i-1]
        return list[i-1]
    except IndexError:
        return None


def change_for_int(var):
    if type(var) is int:
        return int(var)
    else:
        return None
