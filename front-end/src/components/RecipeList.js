import React from "react";
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
import RecipeCell from "./RecipeCell.js";

function RecipeList(props) {
  const { recipes, onSelection, onRecipeSelection, isCart } = props;
  return (
    <Flex flexWrap="wrap" minHeight={0} style={{ overflow: "auto" }}>
      {Object.entries(recipes).map(([id, recipe]) => {
        return (
          <RecipeCell
            key={id}
            recipe={recipe}
            onSelection={onSelection}
            onRecipeSelection={onRecipeSelection}
            inCart={isCart}
          />
        );
      })}
    </Flex>
  );
}

export default RecipeList;
