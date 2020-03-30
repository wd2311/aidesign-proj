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

function IngredientCell(props) {
  const { text } = props;
  return (
    <Flex flexDirection="column">
      <Text p={1}>{text}</Text>
      <hr
        class="solid"
        width="100%"
        style={{ border: "0.5px solid rgb(230, 230, 230)" }}
      />
    </Flex>
  );
}

export default IngredientCell;
