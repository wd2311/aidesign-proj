import json
import numpy as np
from flask_cors import CORS
from flask import jsonify

def query(cart):
    num_generated_candidates = 100
    num_ranked_results = 20

    ### CANDIDATE GENERATION ###

    # Vectorize cart: Dictionaries { ingredient : count }
    cart_ingredients = np.zeros(len(data[0]['ingredient_vector']))
    for recipe in cart:
        cart_ingredients = np.maximum(cart_ingredients, recipe['ingredient_vector'])

    # Containment of vector a in b
    def containment(a, b):
        within = np.dot(a, b)
        total = np.sum(a)
        if total == 0:
            return 0
        return within / total

    # IOU of vectors a and b
    def iou(a, b):
        intersection = np.sum(np.dot(a, b))
        union = np.sum(a) + np.sum(b) - intersection
        if union == 0:
            return 0
        return intersection / union

    # Find similar recipes by ingredients, querying our similarity method
    candidate_ranks = []
    for other_recipe in data:
        other_ingredients = other_recipe['ingredient_vector']
        rank = containment(other_ingredients, cart_ingredients)
        candidate_ranks.append((rank, other_recipe))
        print(rank)

    # Candidates have been generated, by sorting by most similar
    generated_candidates = [x[1] for x in sorted(candidate_ranks, reverse=True, key=lambda x: x[0])][:num_generated_candidates]
    return generated_candidates

    ### RANKING ###

    ranked_results = [x for x in sorted(generated_candidates, key=lambda x: -x['rating'])[num_ranked_results:]]

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
