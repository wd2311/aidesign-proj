from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS

import json
import csv

import numpy as np
import random

from alternate_cg import candidateGeneration
from ranker import ranking

def query(recipes, allergies, num_candidates=100, num_results=20):
    candidates = candidateGeneration(recipes, allergies, num_candidates)
    final_results = ranking(candidates, 10, num_results)

    return final_results

app = Flask(__name__)
CORS(app)

@app.route('/get_recs/')
def get_recs():
    
    fields = ['cart', 'allergys', 'pantry']
    list_separator = ';;;'
    
    params = {}
    args = request.args
    for field in fields:
        if field in args:
            params[field] = args[field].split(list_separator)

    engine = create_engine('sqlite:///db/recipe.db')
    Base.metadata.bind = engine
    DBSession = sessionmaker()
    DBSession.bind = engine
    session = DBSession()

    allergy_query = session.query(Allergy.allergy_id).filter(Allergy.name.in_(tuple(params['allergys'])))
    allergies = [x[0] for x in allergy_query.all()]

    pantry_query = session.query(Recipe.recipe_id).filter(Recipe.recipe_name.in_(tuple(params['pantry'])))
    pantry = [x[0] for x in pantry_query.all()]

    recipes = [int(x) for x  in params['cart']] + pantry

    recs = query(recipes, allergies)

    return jsonify({'recommendations': recs})

@app.route('/get_all_ingredient_names/')
def get_all_ingredient_names():
    engine = create_engine('sqlite:///db/recipe.db')
    Base.metadata.bind = engine
    DBSession = sessionmaker()
    DBSession.bind = engine
    session = DBSession()

    ingredient_query = session.query(Ingredient.ingr_id, Ingredient.name)

    return jsonify({'ingredients': [(item[0], item[1]) for item in ingredient_query.all()]})
