import csv
import json
import ast
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import pprint
import time
from selenium.webdriver.chrome.options import Options
import logging
from selenium.webdriver.remote.remote_connection import LOGGER
import os
from tqdm import tqdm
# from webdriver_manager.chrome import ChromeDriverManager

LOGGER.setLevel(logging.WARNING)
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
# browser = webdriver.Chrome(ChromeDriverManager().install())
browser = webdriver.Chrome(executable_path='C:/D-drive-18921/College/AI System Design/chromedriver_win32/chromedriver.exe', options=chrome_options)
'''
with open("parsed_ingredients.csv") as f:
    recipes = list(csv.reader(f))[1:]
ingredients = []
for recipe in recipes:
    recipe[1] = ast.literal_eval(recipe[1])
    for ingredient in recipe[1]:
        if "name" in ingredient.keys():
'''
with open("chunk_4.csv", encoding='utf-8') as f:
    data = csv.reader(f)
    ingredients = []
    for row in data:
        ingredients.append(row[1])

to_be_deleted = []
for i in range(len(ingredients)):
    ingredients[i] = ingredients[i].translate({ord(x): ' ' for x in ":(),;"})
    if not ingredients[i].replace(" ","").isalnum():
        to_be_deleted.append(i)
for index in sorted(to_be_deleted, reverse=True):
    del ingredients[index]
output = []
for ingredient in tqdm(ingredients[:]):
    print(ingredient)
    formatted_ingredient = ingredient.replace(" ","+")
    try:
        url = "https://www.target.com/s?searchTerm=" + formatted_ingredient
        browser.get(url)
        time.sleep(2)
        browser.execute_script("window.scrollTo(0, 2500)")
        time.sleep(2)
        spans = browser.find_elements_by_tag_name('span')
        price = None
        for i in range(len(spans)):
            content = str(spans[i].get_attribute('innerHTML'))
            if content.startswith('$'):
                if not price:
                    price = content
            if content.startswith(' /') or content.startswith('/') or content.startswith('per') or content.startswith(' per'):
                prev_content = str(spans[i-1].get_attribute('innerHTML'))
                if prev_content.startswith('$'):
                    price = prev_content + content
                    break
        print(price)
        output.append((ingredient, price))
    except Exception as e:
        print(e)
        print('failed to get prices for ', ingredient)
print(output)
with open("chunk_4_price_scrape_results.csv", "w") as f:
    writer = csv.writer(f)
    for row in output:
        writer.writerow(row)