from declarative import Base, Recipe, Ingredient, RecipeIngredient, Allergy, Allergen
from sqlalchemy import create_engine, and_

from math import floor, ceil
import csv


engine = create_engine('sqlite:///recipe.db')

Base.metadata.bind = engine
from sqlalchemy.orm import sessionmaker
DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()

ingredient_entries = session.query(Ingredient).all()


for i in range(5):
    with open(f'chunk_{i}.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        for entry in ingredient_entries[floor(i * len(ingredient_entries) / 5):floor((i + 1) * len(ingredient_entries) / 5)]:
             writer.writerow([entry.ingr_id, entry.name])

