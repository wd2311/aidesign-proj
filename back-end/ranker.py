from gensim.models import word2vec
from gensim.similarities.index import AnnoyIndexer
import numpy as np
from declarative import Base, Recipe, Ingredient, RecipeIngredient, Allergy, Allergen
from sqlalchemy import create_engine, and_
from sqlalchemy.orm import sessionmaker
from sklearn.metrics.pairwise import cosine_similarity
engine = create_engine('sqlite:///db/recipe.db')

Base.metadata.bind = engine

DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()


model = word2vec.Word2Vec.load("vectors/recipes.model")
indexer = AnnoyIndexer(model, 2)

top_50 = model.wv.most_similar('1', topn=20, indexer=indexer)

def ranking(top_50, number):
    ids = [id[0] for id in top_50]
    candidates = []

    for each_recipe in ids:
        [recipe_entry] = session.query(Recipe).filter_by(recipe_id= int(each_recipe)).all()
        # print(recipe_entry)
        candidate_nutrition = {
            'kcal': float(recipe_entry.kcal),
            'fat': float(recipe_entry.fat[:-1]),
            'saturates': float(recipe_entry.saturated_fat[:-1]),
            'carbs': float(recipe_entry.carbs[:-1]),
            'sugars': float(recipe_entry.sugars[:-1]),
            'fibre': float(recipe_entry.fibre[:-1]),
            'protein': float(recipe_entry.protein[:-1]),
            'salt': float(recipe_entry.salt[:-1])
        }
        candidates.append(list(candidate_nutrition.values()))

    candidates = np.array(candidates)
    n, features = candidates.shape

    def iou(a, b):
        intersection = np.sum(np.dot(a, b))
        union = np.sum(a) + np.sum(b) - intersection
        if union == 0:
            return 0
        return intersection / union

    nutrition_similarity = {}
    nutrition_diversity = {}

    #### get pairwise similarity between every recipe
    #### average dissimilarity for each recipe
    #### choose recipe with max avg dissimilarity

    for i in range(n):
        nutrition_similarity[i] = []
        for j in range(n):
            if j!=i:
                val = iou(candidates[i, :], candidates[j, :])
                nutrition_similarity[i].append(val)
        nutrition_diversity[i] = -1 *(sum(nutrition_similarity[i])/len(nutrition_similarity[i]))

    nutrition_diversity = sorted(nutrition_diversity.items(), key=lambda item: item[1], reverse=True)[:number]

    ranker_ids = [id[0] for id in nutrition_diversity]

    return ranker_ids

# ri = ranking(top_50, 10)
# print(ri)