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
import RecipeList from "./RecipeList";

function EmptyCell() {
  return (
    <Box bg="lightgrey" mt={3} p={3} sx={{ borderRadius: 3 }}>
      Cart is Empty
    </Box>
  );
}

function Cart(props) {
  const { recipes, onSelection } = props;
  return (
    <Flex width={1 / 3} flexDirection="column">
      <Heading>Cart</Heading>
      {recipes.length === 0 ? (
        <EmptyCell />
      ) : (
        <RecipeList onSelection={onSelection} isCart={true} recipes={recipes} />
      )}
    </Flex>
  );
}

export default Cart;
