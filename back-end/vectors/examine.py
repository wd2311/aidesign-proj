from gensim.models import word2vec
import numpy as np


model = word2vec.Word2Vec.load("vectors/ingredients.model")

num_features = len(model.wv['olive oil'])
recipe_vector = np.zeros(num_features)

#### find recipe vector for first recipe
num_ingredients = len(ingredient_groups[0])
for ingredient in ingredient_groups[0]:
    recipe_vector += model.wv[ingredient]
recipe_vector /= num_ingredients

print(recipe_vector)
