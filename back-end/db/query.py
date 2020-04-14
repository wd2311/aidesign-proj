from declarative import Base, Recipe, Ingredient, RecipeIngredient, Allergy, Allergen
from sqlalchemy import create_engine, and_

engine = create_engine('sqlite:///recipe.db')

Base.metadata.bind = engine
from sqlalchemy.orm import sessionmaker
DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()

recipe_query = session.query(RecipeIngredient).all()
for item in recipe_query:
    print(f'{item.recipe_id}, {item.ingredient_id}')


'''
dairy_allergen_query = session.query(Allergen).join(Allergy).filter(Allergy.name == 'Dairy').all()

for item in dairy_allergen_query:
    print(item.ingredient.name)

nondairy_recipe_query = session.query(Recipe).join(RecipeIngredient).filter(
'''
