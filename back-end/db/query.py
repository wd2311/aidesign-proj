from declarative import Base, Recipe, Ingredient, RecipeIngredient, Allergy, Allergen
from sqlalchemy import create_engine, and_

engine = create_engine('sqlite:///recipe.db')

Base.metadata.bind = engine
from sqlalchemy.orm import sessionmaker
DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()

ingredient_entries = session.query(Ingredient).all()
for ingredient_entry in ingredient_entries[:100]:
    print(ingredient_entry.name)

'''
ingredient_entry = session.query(Ingredient).filter_by(name='olive oil').first()
for recipe_ingredient in ingredient_entry.recipes:
    print(f'{recipe_ingredient.recipe.recipe_name} -- {recipe_ingredient.recipe.kcal}')
'''

'''
dairy_allergen_query = session.query(Allergen).join(Allergy).filter(Allergy.name == 'Dairy').all()

for item in dairy_allergen_query:
    print(item.ingredient.name)

nondairy_recipe_query = session.query(Recipe).join(RecipeIngredient).filter(
'''
