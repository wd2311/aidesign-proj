import json
import pandas as pd
import nltk
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer

csv_file = 'combined_recipes_with_parsed_ingredients.json'
with open(csv_file) as f:
    data = json.load(f)

unique_ingr = set()
for recipe in data:
    pi = recipe['parsed_ingredients']
    for ingr in pi:
        if 'name' in list(ingr.keys()):
            unique_ingr.add(ingr['name'].lower())

unique_ingr = list(unique_ingr) #### list of unique ingredient names

ingr_table = pd.DataFrame(unique_ingr, columns=['Ingredient'])

lemmatizer = WordNetLemmatizer()

price = pd.read_csv('data/prices.csv')
price = price.iloc[:, 0:3] ### consider only average retail price per pound
price['Name'] = price['Name'].apply(lambda x: x.lower())
price['Name'] = price['Name'].apply(lambda x: lemmatizer.lemmatize(x))
price = price[~price['Name'].str.contains('(frozen)|(canned)|(dried)')] ## drop
price.reset_index(drop=True)

pat = '|'.join(r"{}".format(x) for x in price.Name)
ingr_table['Col2'] = ingr_table['Ingredient'].str.extract('('+ pat + ')', expand=False) ##partial string match with ingredients from prices DF
comb_price_table = pd.merge(ingr_table, price, left_on='Col2', right_on='Name').drop(['Col2', 'Name'], axis=1)

shelf_life = pd.read_excel('data/shelf_life2.xlsx', header=1)
import string
shelf_life['Food Product'] = shelf_life['Food Product'].apply(lambda x: x.lower().replace('opened', ''))
table = str.maketrans(dict.fromkeys(string.punctuation))
shelf_life['Food Product'] = shelf_life['Food Product'].apply(lambda x: x.translate(table)) ## get rid of punctuations

pat = '|'.join(r"{}".format(x) for x in shelf_life['Food Product'])
comb_price_table['Col2'] = comb_price_table['Ingredient'].str.extract('('+ pat + ')', expand=False)
df_final = pd.merge(comb_price_table, shelf_life, left_on='Col2', right_on='Food Product').drop(['Col2', 'Food Product'], axis=1)
df_final.to_csv('data/combined_ingredients.csv')