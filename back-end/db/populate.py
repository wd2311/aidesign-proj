from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import csv
from declarative import Base, Recipe, Ingredient, Allergy, Allergen, RecipeIngredient

engine = create_engine('sqlite:///recipe.db')
Base.metadata.bind = engine
 
DBSession = sessionmaker(bind=engine)

session = DBSession()

#### add from recipes
def load_recipes(recipes_filename):


	for row in open(recipes_filename):
		row = row.lstrip()
		row = row.rstrip()
		row = row.split("|")
		print 'ROW = {}'.format(row)
		recipe_id = row[0]
		recipe_name = row[1]
		recipe_image = row[2]
		recipe_url = row[3]
		recipe_blog_url = row[4]
		recipe_ingredients_list = row[5]
		recipe_yield = row[6]
		recipe_calories = row[7]
		carbohydrates = row[8]
		protein = row[9]
		fiber = row[10]
		fat = row[11]
		potassium = row[12]
		phosphorus = row[13]
		sodium = row[14]
		iron = row[15]
		saturated_fat = row[16]

		recipe = Recipe(recipe_id=int(recipe_id),
			recipe_name=recipe_name,
			recipe_image=recipe_image,
			recipe_url=recipe_url,
			blog_url=recipe_blog_url,
			ingredients_list=recipe_ingredients_list,
			recipe_yield=recipe_yield,
			calories=recipe_calories,
			carbohydrates=recipe_carbohydrates,
			protein=recipe_protein,
			fiber=recipe_fiber,
			fat=recipe_fat,
			potassium=recipe_potassium,
			phosphorus=recipe_phosphorus,
			sodium=recipe_sodium,
			iron=recipe_iron,
			saturated_fat=recipe_saturated_fat)

		session.add(recipe)

	session.commit()



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
