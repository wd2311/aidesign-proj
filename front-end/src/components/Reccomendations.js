import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Link,
  Image,
  Card
} from "rebass/styled-components";
import ReactLoading from "react-loading";
import RecipeList from "./RecipeList.js";

function Reccomendations(props) {
  const { cart, onSelection } = props;
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
        setRecipes(fetchedRecipes);
        setIsLoading(false);
      });
  }, [cart]);
  return (
    <Flex width={2 / 3} mr={3} flexDirection="column">
      <Heading>Reccomended Recipes</Heading>
      {isLoading ? (
        <ReactLoading type="spinningBubbles" color="primary" />
      ) : (
        <RecipeList
          isCart={false}
          recipes={recipes}
          onSelection={id => {
            onSelection(recipes[id]);
          }}
        />
      )}
    </Flex>
  );
}

export default Reccomendations;
