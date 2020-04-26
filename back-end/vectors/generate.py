import pandas as pd
import ast
from gensim.models import word2vec

df = pd.read_csv('data/parsed_ingredients.csv', encoding='latin-1')
ingredients = df['parsed_ingredients'].to_numpy()

print("Loaded data")

ingredient_groups = []

for ingr in ingredients:
    ingr = ast.literal_eval(ingr)
    ingr_per_recipe=[]
    for ec in ingr:
        if 'name' in ec and ec['name'] not in ingredient_groups:
            ingr_per_recipe.append(ec['name'])
    ingredient_groups.append(ingr_per_recipe)

print("Ingredient vectors stored")
# Set values for NN parameters
num_features = 20    # Word vector dimensionality                      
min_word_count = 1
num_workers = 4       # Number of CPUs
context = 5          # Context window size;
                      # let's use avg recipte size                                                                            
downsampling = 1e-3   # threshold for configuring which 
                    # higher-frequency words are randomly downsampled

# Initialize and train the model 
model = word2vec.Word2Vec(ingredient_groups, workers=num_workers, \
            size=num_features, min_count = min_word_count, \
            window = context, sample = downsampling)

# If you don't plan to train the model any further, calling 
# init_sims will make the model much more memory-efficient.
# model.init_sims(replace=True)

model.save('vectors/ingredients.model')
print("Models saved")
