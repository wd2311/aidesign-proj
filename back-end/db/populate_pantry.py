import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import csv
import ast
from sqlalchemy.sql import exists

from declarative import Base, Recipe, Ingredient, Allergy, Allergen, RecipeIngredient

import progressbar

price_map = {}

with open('./price_results.csv', newline='') as file:
    reader = csv.reader(file)
    for row in reader:
        price_map[row[0]] = row[1]

engine = create_engine('sqlite:///recipe.db')
Base.metadata.bind = engine
 
DBSession = sessionmaker(bind=engine)

session = DBSession()

for ingredient in progressbar.progressbar(session.query(Ingredient).all()):
    recipe = Recipe(recipe_name=ingredient.name)
    session.add(recipe)
    recipe_ingredient = RecipeIngredient(recipe=recipe, ingredient=ingredient)
    session.add(recipe_ingredient)
    recipe.ingredients.append(recipe_ingredient)
    ingredient.recipes.append(recipe_ingredient)

session.commit()
