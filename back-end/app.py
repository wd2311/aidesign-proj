from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS

import json
import csv

import numpy as np
import random

from alternate_cg import candidateGeneration

def query(params):

    cart = [data[int(idx)] for idx in params['cart']]
    allergys = [a for a in params['allergys']]
    pantry = [p for p in params['pantry']]

    # Ranker
    def ranker(generated_candidates, num_ranked_results):
        
        # Helper method to generate random subset of candidates
        def sample_random_subset_of_candidates(generated_candidates, num_ranked_results):
            sample_subset = random.sample(generated_candidates, num_ranked_results)
            return sample_subset

        # Nutrition similarity
        def nutrition_similarity(candidate_nutrition, other_candidate_nutrition):
            
            def iou(a, b):
                intersection = np.sum(np.dot(a, b))
                union = np.sum(a) + np.sum(b) - intersection
                if union == 0:
                    return 0
                return intersection / union
            
            nutrition_vector = list(candidate_nutrition.values())
            other_nutrition_vector = list(other_candidate_nutrition.values())

            similarity = iou(nutrition_vector, other_nutrition_vector)
            
            return similarity
        
        # Generate many random subsets of candidates, and measure the nutrition diversity in each
        num_sample_subsets = 50
        sample_subsets_and_their_nutrition_diversity_scores = []
        for i in range(num_sample_subsets):
            sample_subset = sample_random_subset_of_candidates(generated_candidates, num_ranked_results)

            # For each pair of candidates in the subset, measure the similarity.
            subset_nutrition_similarities = []
            for candidate in sample_subset:
                for otherCandidate in sample_subset:
                    if candidate['id'] != otherCandidate['id']:
                        # Compare every candidate with every other candidate
                        candidate_nutrition = {
                            'fat': candidate['fat'],
                            'protein': candidate['protein'],
                            'sodium': candidate['sodium'],
                            'calories': candidate['calories']
                        }

                        other_candidate_nutrition = {
                            'fat': otherCandidate['fat'],
                            'protein': otherCandidate['protein'],
                            'sodium': otherCandidate['sodium'],
                            'calories': otherCandidate['calories']
                        }

                        # Check for missing nutrient information, don't include in average
                        if None not in list(candidate_nutrition.values()) and None not in list(other_candidate_nutrition.values()):
                            nutrition_sim = nutrition_similarity(candidate_nutrition, other_candidate_nutrition)
                            subset_nutrition_similarities.append(nutrition_sim)

            # Average the similarity across pairs of candidates to get a measure of how similar the cluster is to itself
            average_inter_subset_nutrition_similarity = sum(subset_nutrition_similarities) / len(subset_nutrition_similarities)

            # Diversity score is the opposite of average similarity
            nutrition_diversity_score = -1 * average_inter_subset_nutrition_similarity # Diversity is negative similarity

            # Record the diversity score for each randomly generated subset
            sample_subsets_and_their_nutrition_diversity_scores.append((sample_subset, nutrition_diversity_score))

        # Pick the subset with the highest nutrition diversity
        most_nutrition_diverse_subset = [subset_score_pair[0] for subset_score_pair in sorted(sample_subsets_and_their_nutrition_diversity_scores, key=lambda x: -x[1], reverse=False)][0]

        # Sort resulting items by rating
        ranked_results = sorted(most_nutrition_diverse_subset, key=lambda x: -x['rating'])

        return ranked_results
    
    num_generated_candidates = 100
    num_ranked_results = 20

    generated_candidates = candidateGeneration(recipes, allergies, num_generated_candidates)
    final_results = ranker(generated_candidates, num_ranked_results)

    return final_results

app = Flask(__name__)
CORS(app)

data = None
with open('data/full_format_recipes_plus_normalized_ingredients.json') as f:
    data = json.load(f)
for i, recipe in enumerate(data):
    recipe['id'] = i

all_ingredient_names = []
with open('data/combined_ingredients.csv') as f:
    reader = csv.reader(f)
    for i, row in enumerate(reader):
        if i > 0:
            all_ingredient_names.append(row[1])

@app.route('/get_recs/')
def get_recs():
    
    fields = ['cart', 'allergys', 'pantry']
    list_separator = ';;;'
    
    recommendation_params = {}
    args = request.args
    for field in fields:
        if field in args:
            recommendation_params[field] = args[field].split(list_separator)

    recs = query(recommendation_params)

    return jsonify({'recommendations': recs})

@app.route('/get_all_ingredient_names/')
def get_all_ingredient_names():
    return jsonify({'recommendations': all_ingredient_names})
