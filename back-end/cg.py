from gensim.models import word2vec
from gensim.similarities.index import AnnoyIndexer

from db.declarative import Base, Recipe, Ingredient, RecipeIngredient, Allergy, Allergen
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

def containment(session, ingredient_ids, recipe_id):
    recipe_query = session.query(RecipeIngredient).filter_by(recipe_id=int(recipe_id))
    num_recipe_ingredients = recipe_query.count()
    num_contained_ingredients = recipe_query.filter(RecipeIngredient.ingredient_id.in_(ingredient_ids)).count()
    return num_contained_ingredients / num_recipe_ingredients

def nearestRecipes(recipe_id, n, model, indexer):
    return model.most_similar(recipe_id, topn=n, indexer=indexer)

def pullIngredientIds(session, recipes):
    ingredient_ids = []
    for recipe in recipes:
        ingredient_ids = ingredient_ids + session.query(RecipeIngredient.ingredient_id).filter_by(recipe_id=int(recipe)).distinct().all()
    ingredient_ids = [id[0] for id in ingredient_ids]
    return tuple(ingredient_ids)

def filterAllergies(session, candidates, allergies):

    int_allergies = [int(allergy) for allergy in allergies]

    def filterSingle(x):
        recipe_id = x[0]
        ingredient_query = session.query(RecipeIngredient.ingredient).filter_by(recipe_id=recipe_id)
        for ingredient in ingredient_query.all():
            for allergen in ingredient.allergies:
                if allergen.allergy_id in int_allergies:
                    return False
        return True

    return filter(filterSingle, candidates)

def candidateGeneration(recipes, allergies, n=50):
    engine = create_engine('sqlite:///db/recipe.db')
    Base.metadata.bind = engine
    DBSession = sessionmaker()
    DBSession.bind = engine
    session = DBSession()

    model = word2vec.Word2Vec.load("vectors/recipes.model")
    indexer = AnnoyIndexer(model, 2)

    candidates = []
    for recipe in recipes:
        candidates = candidates + nearestRecipes(recipe, 2*n, model, indexer)[1:]

    filterAllergies(session, candidates, allergies)

    ingredient_ids = pullIngredientIds(session, recipes)
    candidates = [ (i, containment(session, ingredient_ids, i)) for i, _ in candidates ]
    candidates.sort(key=lambda x: -x[1])
    print(candidates)
    return [i for i, _ in candidates[:n]]


candidates = candidateGeneration(['100', '200', '300'], ['1', '2'], n=50)
print(candidates)
