import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Link,
  Image,
  Card,
} from 'rebass/styled-components'

function Cart(props) {
  console.log(props.t)
  return (
    <Box
      p={3}
      width={1/8}
      color='white'
      bg={props.color}>
      {props.t}
      </Box>

  );
}

export default Cart;
