import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from declarative import Base, Recipe, Ingredient, Allergy, Allergen, RecipeIngredient

engine = create_engine('sqlite:///recipe.db')
Base.metadata.bind = engine
 
DBSession = sessionmaker(bind=engine)

session = DBSession()

with open('../data/full_format_recipes_plus_normalized_ingredients.json', 'r') as json_file:
    recipes = json.load(json_file)

for recipe in recipes:
    recipe_entry = Recipe(name=recipe['title'], directions='-'.join(recipe['directions']))
    session.add(recipe_entry)
    session.commit()

    for ingredient in recipe['parsed_ingredients']:
        if 'name' not in ingredient:
            continue

        ingredient_exists = session.query(Ingredient.id).filter_by(name=ingredient['name']).scalar() is not None
        if ingredient_exists:
            ingredient_entry = session.query(Ingredient).filter_by(name=ingredient['name']).first()
        else:
            ingredient_entry = Ingredient(name=ingredient['name'])
            session.add(ingredient_entry)

        recipe_ingredient_entry = RecipeIngredient(recipe=recipe_entry, ingredient=ingredient_entry, recipe_id=recipe_entry.id, ingredient_id=ingredient_entry.id)
        if 'qty' in ingredient:
            recipe_ingredient_entry.quantity = ingredient['qty']
        if 'unit' in ingredient:
            recipe_ingredient_entry.unit = ingredient['unit']
        session.add(recipe_ingredient_entry)
    session.commit()
