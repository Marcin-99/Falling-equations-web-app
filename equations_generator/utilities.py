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


def is_int(var):
    if type(var) is int:
        return True
    else:
        return False