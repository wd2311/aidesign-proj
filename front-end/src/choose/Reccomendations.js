import React, { useEffect, useState } from "react";
import RecipeCell from "./RecipeCellV2.js";

function Reccomendations(props) {
  const { mealPlan, onSelection, onSelectRecipe } = props;
  const [recipes, setRecipes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/get_recs/" + cart)
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
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "60px",
        height: "100%",
        overflow: "auto",
        flex: "1 1 auto"
      }}
    >
      {Object.keys(recipes).map(key => {
        return (
          <RecipeCell
            recipe={recipes[key]}
            onSelectRecipe={recipe => onSelectRecipe(recipe)}
          />
        );
      })}
    </div>
  );
}

export default Reccomendations;
