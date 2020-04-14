def conversion_table(given_unit, given_quantity):
    #### convert all weights to pounds
    if given_unit=='g':
        return 0.00220462*given_quantity
    #if given_unit=='oz':
    #    return 0.0625*given_quantity
    if given_unit=='cup':
        return 0.52*given_quantity
    if given_unit=='tbsp':
        return 0.0326*given_quantity
    if given_unit=='tsp':
        return 0.010866*given_quantity

    #### convert all volumes to pint
    if given_unit=='oz' or given_unit=='fl oz':
        return 0.0625*given_quantity
    if given_unit=='l':
        return 2.11338*given_quantity
    if given_unit=='ml':
        return 0.002113*given_quantity
    if given_unit=='gal':
        return 8*given_quantity
    if given_unit=='qt':
        return 2*given_quantity

