import React, { useState } from "react";
import Cart from "./components/Cart.js";
import RecipeList from "./components/RecipeList.js";
import Reccomendations from "./components/Reccomendations.js";
import Navbar from "./components/Navbar.js";
import RecipeDetail from "./components/RecipeDetail.js";
import { ThemeProvider } from "styled-components";
import staticRecRecipes from "./placeholderRecipes.js";
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

import preset from "@rebass/preset";

const theme = {
  ...preset
};

function App() {
  const [cart, setCart] = useState({});
  const [focusRecipe, setFocusRecipe] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      {focusRecipe && <RecipeDetail recipe={focusRecipe} />}
      <Navbar />
      <Flex mt={4} mx={4}>
        <Reccomendations
          cart={
            Object.keys(cart).length
              ? Object.keys(cart).join("-")
              : [...Array(10).keys()].join("-")
          }
          onSelection={recipe => {
            let newCart = Object.assign({}, cart);
            newCart[recipe.id] = recipe;
            console.log(newCart);
            setCart(newCart);
          }}
          onRecipeSelection={recipe => {
            console.log("Recipe selected");
            setFocusRecipe(recipe);
          }}
        />
        <Cart
          recipes={cart}
          onSelection={id => {
            console.log("Delete", id);
            let newCart = Object.assign({}, cart);
            delete newCart[id];
            setCart(newCart);
          }}
        />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
