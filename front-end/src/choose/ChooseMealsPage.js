import React, { useState, useMemo } from "react";
import { Row, Col, Button, Typography, Calendar, Card } from "antd";
import recipes from "./placeholderRecipes.js";

import MealCalendar from "./MealCalendar.js";
import moment from "moment";
import staticRecipes from "./placeholderRecipes";
import RecipeDetail from "../RecipeDetailV2.js";
import Reccomendations from "./Reccomendations.js";
const { Title, Text } = Typography;

function ChooseMealsPage(props) {
  const {
    onClicked,
    mealPlan: initialMP = [],
    allergys = [],
    pantry = []
  } = props;
  const [mealPlan, setMealPlan] = useState(initialMP);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState({
    date: moment().startOf("day"),
    meal: null
  });
  const [selectedMealInCart, setSelectedMealInCart] = useState(false);
  const [selectedMealMeal, setSelectedMealMeal] = useState(null);
  const reccomendations = useMemo(() => {
    return (
      <Reccomendations
        mealPlan={mealPlan}
        allergys={allergys}
        pantry={pantry}
        meal={selectedMeal}
        onSelectRecipe={recipe => {
          console.log("Set selected recipe: ", recipe);
          setSelectedMealInCart(false);
          setSelectedRecipe(recipe);
        }}
        onAddToCart={recipe => {
          setMealPlan(mealPlan.concat([{ ...selectedMeal, recipe: recipe }]));
        }}
      />
    );
  }, [mealPlan, allergys, pantry, selectedMeal]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: "100%",
        backgroundColor: "WhiteSmoke"
      }}
    >
      <RecipeDetail
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onAddToCart={recipe => {
          if (!selectedMealInCart) {
            setMealPlan(mealPlan.concat([{ ...selectedMeal, recipe: recipe }]));
          } else {
            console.log(selectedMealMeal);
            const idx = mealPlan.findIndex(
              element =>
                element.date.isSame(selectedMeal.date) &&
                element.meal === selectedMealMeal &&
                recipe.id === element.recipe.id
            );
            if (idx > -1) {
              setMealPlan([
                ...mealPlan.slice(0, idx),
                ...mealPlan.slice(idx + 1)
              ]);
            }
          }
        }}
        inCart={selectedMealInCart}
      />
      <div
        style={{
          display: "flex",
          padding: "20px",
          alignItems: "start",
          height: "100%"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            flex: "0 0 200px"
          }}
        >
          <MealCalendar
            mealPlan={mealPlan}
            selectedMeal={selectedMeal}
            onSelectMeal={meal => {
              console.log("Set selected meal: ", meal);
              setSelectedMeal(meal);
            }}
            onSelectRecipe={(recipe, meal) => {
              console.log("Set selected recipe: ", recipe, meal);
              setSelectedMealInCart(true);
              setSelectedMealMeal(meal);
              setSelectedRecipe(recipe);
            }}
            onRemove={(recipe, meal) => {
              const idx = mealPlan.findIndex(
                element =>
                  element.date.isSame(selectedMeal.date) &&
                  element.meal === meal &&
                  recipe.id === element.recipe.id
              );
              if (idx > -1) {
                setMealPlan([
                  ...mealPlan.slice(0, idx),
                  ...mealPlan.slice(idx + 1)
                ]);
              }
            }}
          />
          <Button
            onClick={() => onClicked(mealPlan)}
            style={{ marginTop: "20px" }}
            size="large"
            type="primary"
          >
            Complete
          </Button>
        </div>
        {reccomendations}
      </div>
    </div>
  );
}

export default ChooseMealsPage;
