from gensim.models import word2vec
from db.declarative import Base, Recipe, Ingredient, RecipeIngredient, Allergy, Allergen
from sqlalchemy import create_engine, and_
import progressbar

engine = create_engine('sqlite:///db/recipe.db')

Base.metadata.bind = engine
from sqlalchemy.orm import sessionmaker
DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()

recipe_groups = []

num_recipes = session.query(Recipe).count()
ingredient_entries = session.query(Ingredient).all()
for ingredient_entry in progressbar.progressbar(ingredient_entries):
    recipe_group = []
    for recipe_ingredient_entry in ingredient_entry.recipes:
        recipe_group.append(str(recipe_ingredient_entry.recipe_id))
    recipe_groups.append(recipe_group)

print("Recipe groups stored")


# Set values for NN parameters
num_features = 200    # Word vector dimensionality                      
min_word_count = 1
num_workers = 4       # Number of CPUs
context = num_recipes # Context window size;
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

model.save('vectors/recipes.model')
print("Models saved")
