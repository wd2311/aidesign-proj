from gensim.models import word2vec
import numpy as np
import json

with open('demo.json', 'r') as json_file:
    recipes = json.load(json_file)

ingredient_groups = []

for recipe in recipes:
    ingredient_groups.append(recipe['ingredient_names'])

model = word2vec.Word2Vec.load("ingredients.model")

print(model.wv['olive oil'])

num_features = len(model.wv['olive oil'])
recipe_vector = np.zeros(num_features)

num_ingredients = len(ingredient_groups[0])
for ingredient in ingredient_groups[0]:
    recipe_vector += model.wv[ingredient]
recipe_vector /= num_ingredients

print(recipe_vector)
