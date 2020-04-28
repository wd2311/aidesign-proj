import pandas as pd
import ast
from gensim.models import word2vec

from ..db.declarative import Base, Recipe, Ingredient, RecipeIngredient, Allergy, Allergen
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


engine = create_engine('sqlite:///../db/recipe.db')
Base.metadata.bind = engine
DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()

recipe_groups = []

largest_group = 0

for ingredient_id in session.query(Ingredient.ingr_id).all():
    group = []
    for recipe_id in session.query(RecipeIngredient.recipe_id).filter_by(ingredient_id=ingredient_id[0]).all():
        group.append(str(recipe_id[0]))
    recipe_groups.append(group)
    largest_group = max(largest_group, len(group))

print("Ingredient vectors stored")
# Set values for NN parameters
num_features = 100    # Word vector dimensionality                      
min_word_count = 1
num_workers = 4       # Number of CPUs
context = largest_group # Context window size;
                      # let's use avg recipte size                                                                            
downsampling = 1e-3   # threshold for configuring which 
                      # higher-frequency words are randomly downsampled

# Initialize and train the model 
model = word2vec.Word2Vec(recipe_groups, workers=num_workers, \
            size=num_features, min_count = min_word_count, \
            window = context, sample = downsampling)

# If you don't plan to train the model any further, calling 
# init_sims will make the model much more memory-efficient.
# model.init_sims(replace=True)

model.save('vectors/ingredients.model')
print("Models saved")
