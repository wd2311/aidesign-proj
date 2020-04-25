import React, { useState } from "react";
import { Row, Col, Button, Typography, Calendar, Card } from "antd";
import recipes from "./placeholderRecipes.js";

import MealCalendar from "./MealCalendar.js";
import moment from "moment";
import staticRecipes from "./placeholderRecipes";
import RecipeDetail from "../RecipeDetailV2.js";
import Reccomendations from "./Reccomendations.js";
const { Title, Text } = Typography;
function sampleData() {
  return [
    {
      meal: "Breakfast",
      date: moment("2020-04-13"),
      recipe: staticRecipes[1]
    },
    {
      meal: "Lunch",
      date: moment("2020-04-15"),
      recipe: staticRecipes[2]
    },
    {
      meal: "Dinner",
      date: moment("2020-04-15"),
      recipe: staticRecipes[3]
    }
  ];
}

function ChooseMealsPage(props) {
  const { onClicked } = props;
  const [mealPlan, setMealPlan] = useState(sampleData());
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState({
    date: moment().startOf("day"),
    meal: null
  });
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
      />
      <div
        style={{
          display: "flex",
          padding: "20px",
          height: "60%",
          alignItems: "start"
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
            onSelectRecipe={recipe => {
              console.log("Set selected recipe: ", recipe);
              setSelectedRecipe(recipe);
            }}
          />
        </div>
        <Reccomendations
          onSelectRecipe={recipe => {
            console.log("Set selected recipe: ", recipe);
            setSelectedRecipe(recipe);
          }}
        />
      </div>
    </div>
  );
}

export default ChooseMealsPage;
