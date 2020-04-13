from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

class Recipe(Base):
    __tablename__ = 'recipe'
    recipe_id = Column(Integer, primary_key=True)
    recipe_name = Column(String(100))
    ingredients = Column(String(2000), nullable=False)
    method = Column(String(250), nullable=False)
    recipe_img = Column(String(200), nullable=True)

    recipe_yield = Column(Integer, nullable=True)
    calories = Column(String(10), nullable=False)
    carbohydrates = Column(String(10), nullable=False)
    protein = Column(String(10), nullable=False)
    fiber = Column(String(10), nullable=False)
    fat = Column(String(10), nullable=False)
    salt = Column(String(10), nullable=False)
    sugars = Column(String(10), nullable=False)
    saturated_fat = Column(String(10), nullable=False)

class Ingredient(Base):
    __tablename__ = 'ingredient'
    ingr_id = Column(Integer, autoincrement=True, primary_key=True)
    ingr_name = Column(String(100))
    ingr_type = Column(String(100))
    ingr_avg_price = Column(Float, nullable=False)
    ingr_unit = Column(String(50), nullable=False)
    ingr_shelf_life = Column(String(100), nullable = False)

class Unit(Base):
    __tablename__ = 'unit'
    unit_id = Column(Integer, autoincrement=True, primary_key=True)
    unit_amount = Column(String(100), nullable=False)

class Allergy(Base):
    __tablename__ = 'allergy'
    allergy_id = Column(Integer, autoincrement=True, primary_key=True)
    allergy_name = Column(String(100))

class Allergen(Base):
    __tablename__ = 'allergen'
    id = Column(Integer, autoincrement=True, primary_key=True)
    ingredient_id = Column(Integer, ForeignKey('ingredient.ingr_id'), nullable=False)
    allergy_id = Column(Integer, ForeignKey('allergy.allergy_id'), nullable=False)
    ingredient = relationship(Ingredient)
    allergy = relationship(Allergy)

class RecipeToIngredient(Base):
    __tablename__ = 'recipes_to_ingredients'
    recipe_to_ingr_id = Column(Integer, autoincrement=True, primary_key=True)
    recipe_id = Column(Integer, ForeignKey('recipe.recipe_id'), nullable=False)
    ingredient_id = Column(Integer, ForeignKey('ingredient.ingr_id'), nullable=False)
    unit_id = Column(Integer, ForeignKey('unit.unit_id'), nullable=True)
    quantity = Column(Integer, nullable=True)
    recipe = relationship(Recipe)
    ingredient = relationship(Ingredient)
    unit = relationship(Unit)

engine = create_engine('sqlite:///recipe.db')
Base.metadata.create_all(engine)
