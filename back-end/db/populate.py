import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import exists

from declarative import Base, Recipe, Ingredient, Allergy, Allergen, RecipeIngredient

import progressbar

engine = create_engine('sqlite:///recipe.db')
Base.metadata.bind = engine
 
DBSession = sessionmaker(bind=engine)

session = DBSession()

with open('../data/combined_recipes_with_parsed_ingredients.json', 'r') as json_file:
    recipes = json.load(json_file)

for recipe in progressbar.progressbar(recipes):
    if ('name' not in recipe) or ('method' not in recipe) or ('parsed_ingredients' not in recipe):
        continue
    recipe_entry = Recipe(name=recipe['name'], directions='-'.join(recipe['method']))
    session.add(recipe_entry)

    for ingredient in recipe['parsed_ingredients']:
        if 'name' not in ingredient:
            continue

        ingredient_query = session.query(Ingredient).filter_by(name=ingredient['name'])
        if ingredient_query.count() > 0:
            ingredient_entry = ingredient_query.first()
        else:
            ingredient_entry = Ingredient(name=ingredient['name'])
            session.add(ingredient_entry)

        recipe_ingredient_query = session.query(RecipeIngredient).filter_by(recipe_id=recipe_entry.id, ingredient_id=ingredient_entry.id)
        if recipe_ingredient_query.count() > 0:
            continue

        recipe_ingredient_entry = RecipeIngredient(recipe=recipe_entry, ingredient=ingredient_entry)
        if 'qty' in ingredient:
            recipe_ingredient_entry.quantity = ingredient['qty']
        if 'unit' in ingredient:
            recipe_ingredient_entry.unit = ingredient['unit']
        recipe_entry.ingredients.append(recipe_ingredient_entry)
        ingredient_entry.recipes.append(recipe_ingredient_entry)
        session.add(recipe_ingredient_entry)
        session.commit()

