import React, { useState } from "react";
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
import { Switch, Label, Checkbox } from "@rebass/forms";
import RecipeList from "./RecipeList";
import ShoppingList from "./ShoppingList";

function EmptyCell() {
  return (
    <Box bg="lightgrey" mt={3} p={3} sx={{ borderRadius: 3 }}>
      Cart is Empty
    </Box>
  );
}

function Cart(props) {
  const { recipes, onSelection, onRecipeSelection } = props;
  const [showShoppingList, setShowShoppingList] = useState(false);
  return (
    <Flex
      width={1 / 3}
      px={3}
      pt={3}
      flexDirection="column"
      backgroundColor="white"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Heading>Cart</Heading>
        <Box>
          <Label>
            <Checkbox
              onClick={() => setShowShoppingList(!showShoppingList)}
              value={showShoppingList}
              id="remember"
              name="remember"
            />
            Show as Shopping List
          </Label>
        </Box>
      </Flex>
      {Object.keys(recipes).length === 0 ? (
        <EmptyCell />
      ) : showShoppingList ? (
        <ShoppingList recipes={recipes} />
      ) : (
        <RecipeList
          onSelection={onSelection}
          isCart={true}
          recipes={recipes}
          onRecipeSelection={onRecipeSelection}
        />
      )}
    </Flex>
  );
}

export default Cart;
