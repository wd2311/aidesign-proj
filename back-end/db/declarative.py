from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, TEXT
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

class Recipe(Base):
    __tablename__ = 'recipe'
    id = Column(Integer, primary_key=True)
    name = Column(TEXT, nullable=False)
    directions = Column(TEXT)

class Ingredient(Base):
    __tablename__ = 'ingredient'
    id = Column(Integer, primary_key=True)
    name = Column(TEXT)

class Allergy(Base):
    __tablename__ = 'allergy'
    id = Column(Integer, primary_key=True)
    name = Column(TEXT)

class Allergen(Base):
    __tablename__ = 'allergen'
    id = Column(Integer, primary_key=True)
    ingredient_id = Column(Integer, ForeignKey('ingredient.id'), nullable=False)
    allergy_id = Column(Integer, ForeignKey('allergy.id'), nullable=False)
    ingredient = relationship(Ingredient)
    allergy = relationship(Allergy)

class RecipeIngredient(Base):
    __tablename__ = 'recipe_ingredient'
    id = Column(Integer, primary_key=True)
    recipe_id = Column(Integer, ForeignKey('recipe.id'), nullable=False)
    ingredient_id = Column(Integer, ForeignKey('ingredient.id'), nullable=False)
    quantity = Column(Integer, nullable=True)
    unit = Column(TEXT, nullable=True)
    recipe = relationship(Recipe)
    ingredient = relationship(Ingredient)

engine = create_engine('sqlite:///recipe.db')
Base.metadata.create_all(engine)
