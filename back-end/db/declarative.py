from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

class Recipe(Base):
    __tablename__ = 'recipe'
    id = Column(Integer, primary_key=True)
    name = Column(String(25))
    directions = Column(String(250), nullable=False)

class Ingredient(Base):
    __tablename__ = 'ingredient'
    id = Column(Integer, primary_key=True)
    name = Column(String(15))

class Unit(Base):
    __tablename__ = 'unit'
    id = Column(Integer, primary_key=True)
    name = Column(String(15))

class Allergy(Base):
    __tablename__ = 'allergy'
    id = Column(Integer, primary_key=True)
    name = Column(String(15))

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
    unit_id = Column(Integer, ForeignKey('unit.id'), nullable=True)
    quantity = Column(Integer, nullable=True)
    recipe = relationship(Recipe)
    ingredient = relationship(Ingredient)
    unit = relationship(Unit)

engine = create_engine('sqlite:///recipe.db')
Base.metadata.create_all(engine)
