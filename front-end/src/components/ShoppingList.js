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
import ReactStars from "react-stars";
import IngredientCell from "./IngredientCell.js";

function ShoppingList(props) {
  const { recipes } = props;
  console.log("Shopping listj");
  console.log(recipes);
  return (
    <Flex
      mt={2}
      overflow="hidden"
      flexDirection="column"
      flexGrow={1}
      minHeight={0}
    >
      {Object.entries(recipes).map(([id, recipe]) => (
        <div>
          <Text mt={2} mb={1} fontWeight="bold">
            {recipe.title}
          </Text>
          {recipe.ingredients.map(ingredient => (
            <IngredientCell text={ingredient} />
          ))}
        </div>
      ))}
    </Flex>
  );
}

export default ShoppingList;
