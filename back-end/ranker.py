from gensim.models import word2vec
from gensim.similarities.index import AnnoyIndexer
import numpy as np
from declarative import Base, Recipe, Ingredient, RecipeIngredient, Allergy, Allergen
from sqlalchemy import create_engine, and_
from sqlalchemy.orm import sessionmaker
import random


engine = create_engine('sqlite:///db/recipe.db')

Base.metadata.bind = engine

DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()


# model = word2vec.Word2Vec.load("vectors/recipes.model")
# indexer = AnnoyIndexer(model, 2)

# top_50 = model.wv.most_similar('1', topn=50, indexer=indexer)
# top_50 = [id[0] for id in top_50]

def ranking(ids_top_50, num_of_samples, recipes_returned):
    subset_chosen = {}

    def iou(a, b):
        intersection = np.sum(np.dot(a, b))
        union = np.sum(a) + np.sum(b) - intersection
        if union == 0:
            return 0
        return intersection / union

    for i in range(num_of_samples):
        ids_selected = random.sample(ids_top50, recipes_returned) ### randomly select a subset from CG candidates

        candidates = []
        for each_recipe in ids_selected:
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

        #### get pairwise similarity between every recipe
        #### average dissimilarity for each subset
        #### choose subset with max avg dissimilarity
        pairs = 0
        nutrition_similarity = 0
        for i in range(n):
            for j in range(i+1, n):
                if j!=i:
                    nutrition_similarity += iou(candidates[i, :], candidates[j, :])
                    pairs +=1

        avg_sim = nutrition_similarity/pairs
        subset_dissimilarity = -1 * avg_sim
        subset_chosen[tuple(ids_selected)] = subset_dissimilarity

    nutrition_diversity = sorted(subset_chosen.items(), key=lambda item: item[1], reverse=True) ####

    ranker_ids = list(nutrition_diversity[0][0])

    return ranker_ids
#
# ri = ranking(top_50, 8, 20)
# print(ri)
