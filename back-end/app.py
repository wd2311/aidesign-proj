from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS

import json

import numpy as np
import random

def query(params):

    cart = [data[int(idx)] for idx in params['cart']]
    allergys = [a for a in params['allergys']]
    pantry = [p for p in params['pantry']]

    # Candidate Generator
    def candidate_generator(num_generated_candidates):
        # Vectorize cart: Dictionaries { ingredient : count }
        cart_ingredients = np.zeros(len(data[0]['ingredient_vector']))
        for recipe in cart:
            cart_ingredients = np.maximum(cart_ingredients, recipe['ingredient_vector'])

        # Returns true if the recipe does not conflict with the user's allergy restrictions
        def allergy_checker(recipe):
            allergy_categories = {
                'dairy': ['dairy', 'milk', 'cheese', 'butter', 'yogurt', 'cream'],
                'nuts': ['nut', 'almond', 'cashew', 'pecan'],
                'shellfish': ['shellfish', 'clam', 'oyster', 'mussel', 'scallop'],
                'gluten': ['gluten', 'wheat', 'rye', 'barley', 'bread', 'pasta', 'beer', 'bread']
            }

            # If finds allergy, return false
            for allergy in allergys: # for evert allergy,
                if allergy in allergy_categories: # if it's in one of our saved allergy categories
                    allergy_words = allergy_categories[allergy] # get all the words for that allergy category
                    for ingredient in recipe['ingredients']: # for every ingredient
                        for allergy_word in allergy_words: # check if any allergy words are in the ingredient
                            if allergy_word in ingredient: # if they are, allergy check fails.
                                return False
            
            # If no allergy issue, return true (passed allergy check)
            return True   

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
            if allergy_checker(other_recipe): # Only consider a recipe for candidacy if it doesn't violate the user's allergy restrictions
                other_ingredients = other_recipe['ingredient_vector']
                rank = containment(other_ingredients, cart_ingredients)
                candidate_ranks.append((rank, other_recipe))

        # Candidates have been generated, by sorting by most similar
        generated_candidates = [x[1] for x in sorted(candidate_ranks, reverse=True, key=lambda x: x[0])][:num_generated_candidates]
        return generated_candidates

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

    generated_candidates = candidate_generator(num_generated_candidates)
    final_results = ranker(generated_candidates, num_ranked_results)

    return final_results

app = Flask(__name__)
CORS(app)

data = None
with open('data/full_format_recipes_plus_normalized_ingredients.json') as f:
    data = json.load(f)
for i, recipe in enumerate(data):
    recipe['id'] = i

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
