import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import csv
import ast
from sqlalchemy.sql import exists

from declarative import Base, Recipe, Ingredient, Allergy, Allergen, RecipeIngredient

import progressbar
import csv

allergy_categories = {
    'dairy': ['dairy', 'milk', 'cheese', 'butter', 'yogurt', 'cream'],
    'nuts': ['nut', 'almond', 'cashew', 'pecan'],
    'shellfish': ['shellfish', 'clam', 'oyster', 'mussel', 'scallop'],
    'gluten': ['gluten', 'wheat', 'rye', 'barley', 'bread', 'pasta', 'beer', 'bread']
}

engine = create_engine('sqlite:///recipe.db')
Base.metadata.bind = engine
 
DBSession = sessionmaker(bind=engine)

session = DBSession()

session.query(Allergy).delete()
session.query(Allergen).delete()

for allergy_name in allergy_categories:
    ingredients = allergy_categories[allergy_name]
    allergy_entry = Allergy(name=allergy_name)
    session.add(allergy_entry)

    for ingredient in ingredients:
        ingredient_query = session.query(Ingredient).filter_by(name=ingredient)
        if ingredient_query.count() != 1:
            continue
        ingredient_entry = ingredient_query.first()

        if session.query(Allergen).filter_by(ingredient_id=ingredient_entry.ingr_id, allergy_id=allergy_entry.allergy_id).count() > 0:
            continue

        allergen_entry = Allergen(allergy=allergy_entry, ingredient=ingredient_entry)
        session.add(allergen_entry)
        allergy_entry.ingredients.append(allergen_entry)
        ingredient_entry.allergies.append(allergen_entry)
        session.commit()
