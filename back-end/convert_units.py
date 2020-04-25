def conversion_table(given_unit, given_quantity):
    if "cup" in given_unit or given_unit == "c.":
        given_unit = "cup"
    if "lb" in given_unit or "pound" in given_unit:
        given_unit = "lb"
    if "gram" == given_unit:
        given_unit = "g"
    if "teaspoon" in given_unit or given_unit == "tsp.":
        given_unit = "tsp"
    if "tablespoon" in given_unit:
        given_unit = "tbsp"
    if "ounce" in given_unit:
        given_unit = "oz"
    if "pint" in given_unit:
        given_unit = "pt"
    if "litre" == given_unit or "liter" == given_unit:
        given_unit = "l"
    if "quart" in given_unit:
        given_unit = "qt"
    if "gallon" in given_unit:
        given_unit = "gal"

    
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

