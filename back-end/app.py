import json
from flask_cors import CORS
from flask import jsonify

def query(cart):

    def recipe_category_similarity(recipe_categories, other_recipe_categories):
        recipe_dict = {}
        other_recipe_dict = {}

        for category in recipe_categories:
            if category not in recipe_dict:
                recipe_dict[category] = 0
            recipe_dict[category] += 1

        for category in other_recipe_categories:
            if category not in other_recipe_dict:
                other_recipe_dict[category] = 0
            other_recipe_dict[category] += 1

        union = pow(sum([x**2 for x in recipe_dict.values()]), 1/2) * pow(sum([x**2 for x in other_recipe_dict.values()]), 1/2)
        intersection = 0
        for category in list(set(recipe_dict.keys()).union(set(other_recipe_dict.keys()))):
            if category in recipe_dict and category in other_recipe_dict:
                intersection += (recipe_dict[category] * other_recipe_dict[category])

        return intersection / union if union != 0 else 0


    recipe_categories = []
    for recipe in cart:
        if 'categories' in recipe:
            recipe_categories.extend(recipe['categories'])

    similar_recipes = []

    for i, other_recipe in enumerate(data):
        other_recipe_categories = other_recipe['categories'] if 'categories' in other_recipe else []
        category_similarity = recipe_category_similarity(recipe_categories, other_recipe_categories)
        similar_recipes.append((category_similarity, other_recipe))

    recommendations = [x[1] for x in sorted(similar_recipes, key=lambda x: x[0])[:20]]

    return recommendations

from flask import Flask
app = Flask(__name__)
CORS(app)

data = None
with open('data/full_format_recipes.json') as f:
    data = json.load(f)
for i, recipe in enumerate(data):
    recipe['id'] = i

@app.route('/get_recs/<cart>')
def get_recs(cart):
    print(cart)
    rec_list = []

    cart_ids = [int(idx) for idx in cart.split('-')]
    cart_recipes = [data[idx] for idx in cart_ids]
    recs = query(cart_recipes)
    return jsonify({'recommendations': recs})
