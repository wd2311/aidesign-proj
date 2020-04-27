from declarative import Base, Recipe, Ingredient, RecipeIngredient, Allergy, Allergen
from sqlalchemy import create_engine, and_

engine = create_engine('sqlite:///recipe.db')

Base.metadata.bind = engine
from sqlalchemy.orm import sessionmaker
DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()


print(1)
entries = session.query(RecipeIngredient).filter_by(recipe_id=1).all()
for entry in entries:
    print(entry.ingredient_id)

print(3775)
entries = session.query(RecipeIngredient).filter_by(recipe_id=3775).all()
for entry in entries:
    print(entry.ingredient_id)

print(10277)
entries = session.query(RecipeIngredient).filter_by(recipe_id=9756).all()
for entry in entries:
    print(entry.ingredient_id)

'''
ingredient_entries = session.query(Ingredient).all()
for ingredient_entry in ingredient_entries:
    print(ingredient_entry.price)
'''

'''
=======
>>>>>>> 2aa2fe68658d5492225b9fffad9ad845085c8263
recipe_ingredient_entries = session.query(RecipeIngredient).all()
for entry in recipe_ingredient_entries:
    print(entry.complete_input)
    print(entry.ingredient.name)
<<<<<<< HEAD
'''

# ingredient_entry = session.query(Ingredient).filter_by(name='olive oil').first()
# for recipe_ingredient in ingredient_entry.recipes:
#     print(f'{recipe_ingredient.recipe.name}')


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
