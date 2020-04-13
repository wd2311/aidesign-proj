import json
from gensim.models import word2vec

with open('demo.json', 'r') as json_file:
    recipes = json.load(json_file)

ingredient_groups = []

for recipe in recipes:
    ingredient_groups.append(recipe['ingredient_names'])

# Set values for NN parameters
num_features = 20    # Word vector dimensionality                      
min_word_count = 1
num_workers = 4       # Number of CPUs
context = 50          # Context window size; 
                      # let's use avg recipte size                                                                            
downsampling = 1e-3   # threshold for configuring which 
                    # higher-frequency words are randomly downsampled

# Initialize and train the model 
model = word2vec.Word2Vec(ingredient_groups, workers=num_workers, \
            size=num_features, min_count = min_word_count, \
            window = context, sample = downsampling)

# If you don't plan to train the model any further, calling 
# init_sims will make the model much more memory-efficient.
model.init_sims(replace=True)

model.save('ingredients.model')
