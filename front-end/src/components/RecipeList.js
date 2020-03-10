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
  const { recipes, onSelection, isCart } = props;
  return (
    <Flex flexWrap="wrap">
      {Object.entries(recipes).map(([id, recipe]) => {
        return (
          <RecipeCell
            key={id}
            recipe={recipe}
            onSelection={onSelection}
            inCart={isCart}
          />
        );
      })}
    </Flex>
  );
}

export default RecipeList;