import React, { useState } from "react";
import Cart from "./components/Cart.js";
import RecipeList from "./components/RecipeList.js";
import Navbar from "./components/Navbar.js";
import { ThemeProvider } from "styled-components";
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

const staticRecRecipes = {
  1: {
    name: "Spegetti and Meatballs",
    description:
      "A delicious helping of spagetti nice and good very delicious. This spagetti will make you very pleased indeed.",
    src: "meetballs.jpg",
    stars: 4,
    id: 1
  },
  2: {
    name: "Spegetti and Meatballs",
    description:
      "A delicious helping of spagetti nice and good very delicious. This spagetti will make you very pleased indeed.",
    src: "meetballs.jpg",
    stars: 4,
    id: 2
  },
  3: {
    name: "Spegetti and Meatballs",
    description:
      "A delicious helping of spagetti nice and good very delicious. This spagetti will make you very pleased indeed.",
    src: "meetballs.jpg",
    stars: 4,
    id: 3
  },
  4: {
    name: "Spegetti and Meatballs",
    description:
      "A delicious helping of spagetti nice and good very delicious. This spagetti will make you very pleased indeed.",
    src: "meetballs.jpg",
    stars: 4,
    id: 4
  },
  5: {
    name: "Spegetti and Meatballs",
    description:
      "A delicious helping of spagetti nice and good very delicious. This spagetti will make you very pleased indeed.",
    src: "meetballs.jpg",
    stars: 4,
    id: 5
  },
  6: {
    name: "Spegetti and Meatballs",
    description:
      "A delicious helping of spagetti nice and good very delicious. This spagetti will make you very pleased indeed.",
    src: "meetballs.jpg",
    stars: 4,
    id: 6
  },
  7: {
    name: "Spegetti and Meatballs",
    description:
      "A delicious helping of spagetti nice and good very delicious. This spagetti will make you very pleased indeed.",
    src: "meetballs.jpg",
    stars: 4,
    id: 7
  },
  8: {
    name: "Spegetti and Meatballs",
    description:
      "A delicious helping of spagetti nice and good very delicious. This spagetti will make you very pleased indeed.",
    src: "meetballs.jpg",
    stars: 4,
    id: 8
  }
};

const theme = {
  ...preset
};

function App() {
  const [cart, setCart] = useState({});
  const [reccomendations, setReccomendations] = useState(staticRecRecipes);
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Flex mt={4} mx={4}>
        <Flex width={2 / 3} mr={3} flexDirection="column">
          <Heading>Reccomended Recipes</Heading>
          <RecipeList
            isCart={false}
            recipes={reccomendations}
            onSelection={id => {
              console.log("Delete", id);
              let newRec = Object.assign({}, reccomendations);
              let newCart = Object.assign({}, cart);
              newCart[id] = reccomendations[id];
              delete newRec[id];
              console.log(newRec);
              setCart(newCart);
              setReccomendations(newRec);
            }}
          />
        </Flex>
        <Cart
          recipes={cart}
          onSelection={id => {
            console.log("Delete", id);
            let newRec = Object.assign({}, reccomendations);
            let newCart = Object.assign({}, cart);
            newRec[id] = cart[id];
            delete newCart[id];
            setCart(newCart);
            setReccomendations(newRec);
          }}
        />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
