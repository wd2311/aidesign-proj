from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from declarative import Base, Recipe, Ingredient, Allergy, Allergen, RecipeIngredient

engine = create_engine('sqlite:///recipe.db')
Base.metadata.bind = engine
 
DBSession = sessionmaker(bind=engine)

session = DBSession()

# Add a grilled cheese

grilled_cheese = Recipe(name='Grilled Cheese', directions='You know the drill.')
session.add(grilled_cheese)

cheese = Ingredient(name='Cheese')
bread = Ingredient(name='Bread')
session.add(cheese)
session.add(bread)

grilled_cheese_cheese = RecipeIngredient(recipe=grilled_cheese, ingredient=cheese, quantity=1)
grilled_cheese_bread = RecipeIngredient(recipe=grilled_cheese, ingredient=bread, quantity=2)
session.add(grilled_cheese_cheese)
session.add(grilled_cheese_bread)

session.commit()

# Add a zucchini sandwich

zucchini_sandwich = Recipe(name='Veggie Sandwich', directions='Put it together')
session.add(zucchini_sandwich)

zucchini = Ingredient(name='Zucchini')
session.add(zucchini)

zucchini_sandwich_zucchini = RecipeIngredient(recipe=zucchini_sandwich, ingredient=zucchini, quantity=1)
zucchini_sandwich_bread = RecipeIngredient(recipe=zucchini_sandwich, ingredient=bread, quantity=2)
session.add(zucchini_sandwich_zucchini)
session.add(zucchini_sandwich_bread)

session.commit()

# Add a dairy allergy

dairy_free = Allergy(name='Dairy')
session.add(dairy_free)

allergen = Allergen(allergy=dairy_free, ingredient=cheese)
session.add(allergen)

session.commit()
