import json
from flask_cors import CORS
from flask import jsonify

def query(cart):
    num_generated_candidates = 100
    num_ranked_results = 20

    ### CANDIDATE GENERATION ###

    # Vectorize cart: Dictionaries { ingredient : count }
    recipe_categories = []
    for recipe in cart:
        if 'categories' in recipe:
            recipe_categories.extend(recipe['categories'])

    recipe_ingredient_names = []
    for recipe in cart:
        if 'ingredient_names' in recipe:
            recipe_ingredient_names.extend(recipe['ingredient_names'])

    # Helper method for similarity
    def dictionary_intersection_over_union_similarity(recipe_categories, other_recipe_categories):
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

        # union = pow(sum([x**2 for x in recipe_dict.values()]), 1/2) * pow(sum([x**2 for x in other_recipe_dict.values()]), 1/2)
        union = sum([x for x in recipe_dict.values()]) + sum([x for x in other_recipe_dict.values()])
        intersection = 0
        for category in list(set(recipe_dict.keys()).union(set(other_recipe_dict.keys()))):
            if category in recipe_dict and category in other_recipe_dict:
                intersection += (recipe_dict[category] + other_recipe_dict[category])

        return intersection / union if union != 0 else 0

    # Find similar recipes by ingredients, querying our similarity method
    similar_recipes = []
    for i, other_recipe in enumerate(data):
        other_recipe_categories = other_recipe['categories'] if 'categories' in other_recipe else []
        other_recipe_ingredient_names = other_recipe['ingredient_names'] if 'ingredient_names' in other_recipe else []
        category_similarity = dictionary_intersection_over_union_similarity(recipe_categories, other_recipe_categories)
        ingredient_name_similarity = dictionary_intersection_over_union_similarity(recipe_ingredient_names, other_recipe_ingredient_names)
        similar_recipes.append((category_similarity, other_recipe))

    # Candidates have been generated, by sorting by most similar
    generated_candidates = [x[1] for x in sorted(similar_recipes, key=lambda x: x[0])[:num_generated_candidates]]

    ### RANKING ###

    ranked_results = [x for x in sorted(generated_candidates, key=lambda x: -x['rating'])[:num_ranked_results]]

    return ranked_results

from flask import Flask
app = Flask(__name__)
CORS(app)

data = None
with open('data/full_format_recipes_plus_normalized_ingredients.json') as f:
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
