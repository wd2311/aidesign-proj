import json
import subprocess
import time
from tqdm import tqdm

with open('data/full_format_recipes.json') as f:
    data = json.load(f)
ingredient_names = []
for recipe in tqdm(data):
    with open("tmp/parser-input.txt", "w") as f:
        for ingredient in recipe["ingredients"]:
            f.write(ingredient + "\n")
    with open("tmp/parser-output.txt", "w") as f:
        bash_cmd = "python ./ingredient-phrase-tagger/bin/parse-ingredients.py tmp/parser-input.txt"
        process = subprocess.check_call(bash_cmd.split(), stdout=f)
    with open("tmp/ingredient_info.json", "w") as f:
        bash_cmd = "python ./ingredient-phrase-tagger/bin/convert-to-json.py tmp/parser-output.txt"
        process = subprocess.Popen(bash_cmd.split(), stdout=f)
    time.sleep(2)
    with open('tmp/ingredient_info.json', 'r') as f:
        s = f.read()
        s = s.replace("\'","") # weird output formatting requires these corrections
        s = s.replace("\n","")
        parsed_ingredients = json.loads(s)
    recipe["ingredient_names"] = []
    for ingredient in parsed_ingredients:
        if "name" in ingredient.keys():
            recipe["ingredient_names"].append(ingredient["name"])
            ingredient_names.append(ingredient["name"])
    recipe["parsed_ingredients"] = parsed_ingredients

ingredient_mapping = {}
for i, ingredient in enumerate(list(set(ingredient_names))):
    ingredient_mapping[ingredient] = i

for recipe in data:
    recipe["ingredient_vector"] = [0] * len(ingredient_mapping.keys())
    for ingredient in recipe["ingredient_names"]:
        recipe["ingredient_vector"][ingredient_mapping[ingredient]] = 1

with open('data/recipes_with_parsed_ingredients.json', "w") as f:
    json.dump(data, f)