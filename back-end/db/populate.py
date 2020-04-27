import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import csv
import ast
from sqlalchemy.sql import exists

from declarative import Base, Recipe, Ingredient, Allergy, Allergen, RecipeIngredient

import progressbar

engine = create_engine('sqlite:///recipe.db')
Base.metadata.bind = engine
 
DBSession = sessionmaker(bind=engine)

session = DBSession()

db_path = '../data/new_recipe_db_parsed.csv'

with open(db_path, 'r', encoding='latin-1') as f:
    reader = csv.reader(f, delimiter=',')
    for i, row in progressbar.progressbar(enumerate(reader)):
        if i == 0:
            continue
        recipe_id = i
        recipe_name = row[1]
        nutrition = ast.literal_eval(row[4])
        kcal = nutrition['kcal']
        fat = nutrition['fat']
        saturated_fat = nutrition['saturates']
        carbs = nutrition['carbs']
        sugars = nutrition['sugars']
        fibre = nutrition['fibre']
        protein = nutrition['protein']
        salt = nutrition['salt']
        
        method = ast.literal_eval(row[6])
        recipe_yield = row[9]
        img_url = row[10]
        
        recipe_entry = Recipe(recipe_name = recipe_name,
                             kcal = kcal,
                             fat = fat,
                             saturated_fat = saturated_fat,
                             carbs = carbs,
                             sugars = sugars,
                             fibre = fibre,
                             protein = protein,
                             salt = salt,
                             directions = '\n'.join(method),
                             recipe_yield = recipe_yield,
                             recipe_img = img_url)

        session.add(recipe_entry)
        
        parsed_ingr = ast.literal_eval(row[11])

        for ingredient in parsed_ingr:
            if ('name' not in ingredient) or ('input' not in ingredient):
                continue
            ingredient_query = session.query(Ingredient).filter_by(name=ingredient['name'])
            if ingredient_query.count() > 0:
                ingredient_entry = ingredient_query.first()
            else:
                ingredient_entry = Ingredient(name=ingredient['name'])
                session.add(ingredient_entry)

            recipe_ingredient_query = session.query(RecipeIngredient).filter_by(recipe_id=recipe_entry.recipe_id, 
                                                                                ingredient_id=ingredient_entry.ingr_id)
            if recipe_ingredient_query.count() > 0:
                continue

            recipe_ingredient_entry = RecipeIngredient(recipe=recipe_entry, ingredient=ingredient_entry)
            if 'qty' in ingredient:
                recipe_ingredient_entry.quantity = ingredient['qty']
            if 'unit' in ingredient:
                recipe_ingredient_entry.unit = ingredient['unit']
            if 'input' in ingredient:
                recipe_ingredient_entry.complete_input = ingredient['input']
            recipe_entry.ingredients.append(recipe_ingredient_entry)
            ingredient_entry.recipes.append(recipe_ingredient_entry)
            session.add(recipe_ingredient_entry)
            session.commit()

