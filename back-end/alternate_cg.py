from gensim.models import word2vec
from gensim.similarities.index import AnnoyIndexer

from db.declarative import Base, Recipe, Ingredient, RecipeIngredient, Allergy, Allergen
from sqlalchemy import create_engine, func
import progressbar

engine = create_engine('sqlite:///db/recipe.db')

Base.metadata.bind = engine
from sqlalchemy.orm import sessionmaker
DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()

def containment(ingredient_ids, recipe_id):
    recipe_query = session.query(RecipeIngredient).filter_by(recipe_id=int(recipe_id))
    num_recipe_ingredients = recipe_query.count()
    num_contained_ingredients = recipe_query.filter(RecipeIngredient.ingredient_id.in_(ingredient_ids)).count()
    return num_contained_ingredients / num_recipe_ingredients

def nearestRecipes(recipe_id, n):
    ingredient_ids = session.query(RecipeIngredient.ingredient_id).filter_by(recipe_id=int(recipe_id)).all()
    ingredient_ids = tuple([i[0] for i in ingredient_ids])
    recipe_ids = session.query(RecipeIngredient.recipe_id).filter(RecipeIngredient.ingredient_id.in_(ingredient_ids)).distinct().order_by(func.random()).all()
    return set([i[0] for i in recipe_ids][:n])

def pullIngredientIds(recipes):
    ingredient_ids = []
    for recipe in recipes:
        ingredient_ids = ingredient_ids + session.query(RecipeIngredient.ingredient_id).filter_by(recipe_id=int(recipe)).distinct().all()
    ingredient_ids = [id[0] for id in ingredient_ids]
    return tuple(ingredient_ids)

def candidateGeneration(recipes, n=50):
    candidates = set()
    for recipe in recipes:
        candidates.update(nearestRecipes(recipe, n*2))
    ingredient_ids = pullIngredientIds(recipes)
    candidates = [ (i, containment(ingredient_ids, i)) for i in candidates ]
    candidates.sort(key=lambda x: -x[1])
    print(candidates)
    return [i for i, _ in candidates[:n]]

candidates = candidateGeneration(['100', '200', '300'], n=50)
print(candidates)
