import React, { useEffect, useState } from "react";
import RecipeCell from "./RecipeCell.js";
import { Spin, Popover, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
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
      <div
        style={{
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          marginBottom: "10px"
        }}
      >
        <Title style={{ margin: "0 5px 0 0" }} level={4}>
          Recommended Recipes
        </Title>
        <Popover
          title="Why are these recommended?"
          placement="bottom"
          arrowPointAtCenter
          overlayStyle={{ maxWidth: "20%" }}
          content={
            <p>
              1. Try to find recipes with similar ingredients so you can shop
              less and save money.
              <br />
              2. Items you already have, to reduce waste and save money.
              <br />
              3. Dietary needs.
              <br />
              4. Balancing the nutritional content of your cart.
              <br />
            </p>
          }
        >
          <InfoCircleOutlined />
        </Popover>
      </div>
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
