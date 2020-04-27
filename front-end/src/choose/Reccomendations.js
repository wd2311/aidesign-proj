import React, { useEffect, useState } from "react";
import RecipeCell from "./RecipeCellV2.js";
import { Spin } from "antd";
import { Typography } from "antd";
const { Title, Text } = Typography;
function generateQuery(mealPlan, allergys, pantry) {
  const mealPlanString =
    mealPlan.length > 0
      ? mealPlan.map(meal => meal.recipe.id).join(";;;")
      : "1;;;2;;;3;;;4";
  const allergyString = allergys.join(";;;");
  const pantryString = pantry.join(";;;");
  return (
    "http://localhost:5000/get_recs/?" +
    "cart=" +
    mealPlanString +
    "&allergys=" +
    allergyString +
    "&pantry=" +
    pantryString
  );
}

function Reccomendations(props) {
  const {
    mealPlan,
    allergys,
    pantry,
    meal,
    onSelection,
    onSelectRecipe,
    onAddToCart
  } = props;
  const [recipes, setRecipes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasMeal, setHasMeal] = useState(false);
  useEffect(() => {
    if (!meal.date || !meal.meal) {
      setHasMeal(false);
      return;
    }
    setHasMeal(true);
    setIsLoading(true);
    fetch(generateQuery(mealPlan, allergys, pantry))
      .then(res => res.json())
      .then(response => {
        const fetchedRecipes = response["recommendations"].reduce(
          (obj, recipe) => {
            obj[recipe.id] = recipe;
            return obj;
          },
          {}
        );
        console.log(fetchedRecipes);
        setRecipes(fetchedRecipes);
        setIsLoading(false);
      });
  }, [allergys, meal.date, meal.meal, mealPlan, pantry]);
  return (
    <div
      style={{
        marginLeft: "60px",
        height: "100%",
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Title style={{ flex: "0 0 auto" }} level={4}>
        Reccomended Recipes
      </Title>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          overflowY: "auto",
          flex: "1 1 auto"
        }}
      >
        {!hasMeal && (
          <div
            style={{
              display: "flex",
              flex: "1 1 auto",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ alignText: "center" }}>
              Please select a date and a meal for us to provide reccomendations
              for!
            </Text>
          </div>
        )}
        {hasMeal && isLoading && (
          <div
            style={{
              display: "flex",
              flex: "1 1 auto",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Spin size="large" tip="Generating your recommendations..." />
          </div>
        )}
        {isLoading ||
          !hasMeal ||
          Object.keys(recipes).map(key => {
            return (
              <RecipeCell
                recipe={recipes[key]}
                onSelect={recipe => onSelectRecipe(recipe)}
                onAddToCart={recipe => onAddToCart(recipe)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Reccomendations;
