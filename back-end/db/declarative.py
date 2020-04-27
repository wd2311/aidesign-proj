from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, TEXT
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

class Recipe(Base):
    __tablename__ = 'recipe'
    recipe_id = Column(Integer, primary_key=True)
    ingredients = relationship('RecipeIngredient', back_populates='recipe')
    
    recipe_name = Column(TEXT)
    kcal = Column(Integer)
    fat = Column(TEXT)
    saturated_fat = Column(TEXT)
    carbs = Column(TEXT)
    sugars = Column(TEXT)
    fibre = Column(TEXT)
    protein = Column(TEXT)
    salt = Column(TEXT)
    directions = Column(TEXT)
    recipe_yield = Column(TEXT)
    recipe_img = Column(TEXT)
    

class Ingredient(Base):
    __tablename__ = 'ingredient'
    ingr_id = Column(Integer, primary_key=True)
    recipes = relationship('RecipeIngredient', back_populates='ingredient')
    allergies = relationship('Allergen', back_populates='ingredient')
    name = Column(TEXT)

class Allergy(Base):
    __tablename__ = 'allergy'
    allergy_id = Column(Integer, primary_key=True)
    ingredients = relationship('Allergen', back_populates='allergy')
    name = Column(TEXT)

class Allergen(Base):
    __tablename__ = 'allergen'
    allergy_id = Column(Integer, ForeignKey('allergy.allergy_id'), primary_key=True)
    ingredient_id = Column(Integer, ForeignKey('ingredient.ingr_id'), primary_key=True)
    allergy = relationship('Allergy', back_populates='ingredients')
    ingredient = relationship('Ingredient', back_populates='allergies')

class RecipeIngredient(Base):
    __tablename__ = 'recipe_ingredient'
    recipe_id = Column(Integer, ForeignKey('recipe.recipe_id'), primary_key=True)
    ingredient_id = Column(Integer, ForeignKey('ingredient.ingr_id'), primary_key=True)
    recipe = relationship('Recipe', back_populates='ingredients')
    ingredient = relationship('Ingredient', back_populates='recipes')
    quantity = Column(TEXT, nullable=True)
    unit = Column(TEXT, nullable=True)
    complete_input = Column(TEXT, nullable=True)

engine = create_engine('sqlite:///recipe.db')
Base.metadata.create_all(engine)
