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

function Navbar(props) {
  return (
    <Flex px={2} color="white" bg="black" alignItems="center">
      <Text p={2} fontWeight="bold">
        Food
      </Text>
      <Box mx="auto" />
      <Link variant="nav" href="#!">
        Profile
      </Link>
    </Flex>
  );
}

export default Navbar;
