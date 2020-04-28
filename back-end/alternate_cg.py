from gensim.models import word2vec
from gensim.similarities.index import AnnoyIndexer

from db.declarative import Base, Recipe, Ingredient, RecipeIngredient, Allergy, Allergen
from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker

def containment(session, ingredient_ids, recipe_id):
    recipe_query = session.query(RecipeIngredient).filter_by(recipe_id=int(recipe_id))
    num_recipe_ingredients = recipe_query.count()
    num_contained_ingredients = recipe_query.filter(RecipeIngredient.ingredient_id.in_(ingredient_ids)).count()
    return num_contained_ingredients / num_recipe_ingredients

def nearestRecipes(session, recipe_ids, recipe_id, allergies, n):
    ingredient_ids = session.query(RecipeIngredient.ingredient_id).filter_by(recipe_id=int(recipe_id)).all()
    ingredient_ids = tuple([i[0] for i in ingredient_ids])
    recipe_query = session.query(RecipeIngredient.recipe_id).filter(RecipeIngredient.ingredient_id.in_(ingredient_ids)).distinct().filter(~RecipeIngredient.recipe_id.in_(tuple(recipe_ids))).order_by(func.random())
    allergy_ingredient_query = session.query(Allergen.ingredient_id).filter(Allergen.allergy_id.in_(allergies))
    allergy_recipe_query = session.query(RecipeIngredient.recipe_id).filter(RecipeIngredient.ingredient_id.in_(allergy_ingredient_query))
    recipe_ids = recipe_query.filter(~RecipeIngredient.recipe_id.in_(allergy_recipe_query)).all()
    return set([i[0] for i in recipe_ids][:n])

def pullIngredientIds(session, recipes):
    ingredient_ids = []
    for recipe in recipes:
        ingredient_ids = ingredient_ids + session.query(RecipeIngredient.ingredient_id).filter_by(recipe_id=int(recipe)).distinct().all()
    ingredient_ids = [id[0] for id in ingredient_ids]
    return tuple(ingredient_ids)

def candidateGeneration(recipes, allergies, n=50):
    engine = create_engine('sqlite:///db/recipe.db')
    Base.metadata.bind = engine
    DBSession = sessionmaker()
    DBSession.bind = engine
    session = DBSession()

    allergy_tuple = tuple([int(allergy) for allergy in allergies])
    candidates = set()
    for recipe in recipes:
        candidates.update(nearestRecipes(session, recipes, recipe, allergy_tuple, n*2))
    ingredient_ids = pullIngredientIds(session, recipes)
    candidates = [ (i, containment(session, ingredient_ids, i)) for i in candidates ]
    candidates.sort(key=lambda x: -x[1])
    return [i for i, _ in candidates[:n]]
