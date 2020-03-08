import json
import nltk

with open("epirecipes/full_format_recipes.json", "r") as f:
    json_data = json.load(f)

# Delete malformed data entries without "categories"
delete = []
for i in range(len(json_data)):
    if "categories" not in json_data[i].keys():
        delete.append(i)
for i in sorted(delete, reverse=True):
    del json_data[i]

select = {0, 1, 10, 100, 110}

categories = []
for s in select:
    categories += json_data[s]["categories"]
categories = list(set(categories))

bag_of_words = []
for recipe in json_data:
    vect = []
    for category in categories:
        if category in recipe["categories"]:
            vect.append(1)
        else:
            vect.append(0)
    bag_of_words.append(vect)

sums = [sum(x) for x in bag_of_words]
argsort = sorted(range(len(sums)), key=sums.__getitem__, reverse=True)

print("Cart:")
for s in select:
    print(json_data[s]["title"])
print()
print("Recommended:")
for s in argsort[:10]:
    print(json_data[s]["title"])
