def conversion_table(given_quantity, given_unit):
    g = ['gram',
    'gram bunch',
    'gram can',
    'gram piece',
    'gram sprig',
    'gram tablespoon']
    if given_unit in g:
        given_unit = 'gram'
    ml = [
        'millilitre',
        'millilitre can',
        'millilitre teaspoon'
    ]
    if given_unit in ml:
        given_unit = 'millilitre'
    tbsp = [
        'tablespoon',
        'tablespoon tablespoon',
        'handful'
    ]
    if given_unit in tbsp:
        given_unit = 'tablespoon'
    tsp = [
        'teaspoon',
        'teaspoon tablespoon',
        'dash',
        'drop',
        'pinch'
    ]
    if given_unit in tsp:
        given_unit = 'teaspoon'
    bag = [
        'large bunch',
        'large sprig',
        'sprig',
        'stalk',
        'stem',
        'stick'
    ]
    if given_unit in bag:
        given_unit = 'pound'
        given_quantity = 0.25*given_quantity
    # if "ounce" in given_unit:
    #     given_unit = "oz"
    # if "pint" in given_unit:
    #     given_unit = "pt"
    # if "litre" == given_unit or "liter" == given_unit:
    #     given_unit = "l"
    # if "quart" in given_unit:
    #     given_unit = "qt"
    # if "gallon" in given_unit:
    #     given_unit = "gal"

    
    #### convert all weights to pounds
    if given_unit=='gram':
        return (0.00220462*given_quantity, 'pound')
    elif given_unit=='cup':
        return (0.52*given_quantity, 'pound')
    elif given_unit=='tablespoon':
        return (0.0326*given_quantity, 'pound')
    elif given_unit=='teaspoon':
        return (0.010866*given_quantity, 'pound')

    #### convert all volumes to pint
    elif given_unit=='ounce':
        return (0.0625*given_quantity, 'pint')
    # if given_unit=='l':
    #     return 2.11338*given_quantity
    elif given_unit=='millilitre':
        return (0.002113*given_quantity, 'pint')
    # if given_unit=='gal':
    #     return 8*given_quantity
    elif given_unit=='quart':
        return (2*given_quantity, 'pint')
    else:
        return (given_quantity, given_unit)

# d = conversion_table(245, 'gram')
# print(d)

