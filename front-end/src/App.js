import React from "react";
import Cart from "./components/Cart.js";
import RecipeCell from "./components/RecipeCell.js";
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

const theme = {
  ...preset
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Flex>
      <RecipeCell
        name="Spegetti and Meatballs"
        description="A delicious helping of spagetti nice and good very delicious. This spagetti will make you very pleased indeed."
        src="meetballs.jpg"
        stars={4}
      />
      <RecipeCell
        name="Spegetti and Meatballs"
        description="A delicious helping of spagetti nice and good very delicious. This spagetti will make you very pleased indeed."
        src="meetballs.jpg"
        stars={4}
      />
      <RecipeCell
        name="Spegetti and Meatballs"
        description="A delicious helping of spagetti nice and good very delicious. This spagetti will make you very pleased indeed."
        src="meetballs.jpg"
        stars={4}
      />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
