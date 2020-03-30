import React, { useState, useRef, useEffect } from "react";
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
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const theme = {
  ...preset
};

function App() {
  const [cart, setCart] = useState({});
  const [focusRecipe, setFocusRecipe] = useState(null);
  const body = useRef(null);

  useEffect(() => {
    if (focusRecipe) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
  }, [focusRecipe]);

  const addToCart = recipe => {
    let newCart = Object.assign({}, cart);
    newCart[recipe.id] = recipe;
    console.log(newCart);
    setCart(newCart);
  };

  return (
    <ThemeProvider theme={theme}>
      {focusRecipe && (
        <RecipeDetail
          recipe={focusRecipe}
          onCancel={() => setFocusRecipe(null)}
          onSelection={recipe => {
            addToCart(recipe);
            setFocusRecipe(null);
          }}
        />
      )}
      <Navbar />
      <Flex mx={0} backgroundColor="WhiteSmoke" ref={body} alignItems="stretch">
        <Reccomendations
          cart={
            Object.keys(cart).length
              ? Object.keys(cart).join("-")
              : [...Array(10).keys()].join("-")
          }
          onSelection={addToCart}
          onRecipeSelection={recipe => {
            console.log("Recipe selected");
            setFocusRecipe(recipe);
          }}
        />
        <Cart
          recipes={cart}
          onRecipeSelection={recipe => {
            console.log("Recipe selected");
            setFocusRecipe(recipe);
          }}
          onSelection={recipe => {
            console.log("Delete", recipe.id);
            let newCart = Object.assign({}, cart);
            delete newCart[recipe.id];
            setCart(newCart);
          }}
        />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
