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

function RecipeCell(props) {
  const { name, description, src, stars } = props;

  return (
    <Card
      sx={{ borderRadius: 3 }}
      flex="0 0 auto"
      mx={3}
      my={3}
      width={200}
      px={0}
      pt={0}
    >
      <Flex width="100%" alignItems="stretch" flexDirection="column">
        <Image
          src={src}
          height="100px"
          width="100%"
          mb={2}
          sx={{ borderRadius: "3px 3px 0 0", objectFit: "cover" }}
        />
        <Flex
          justifyContent="flex-start"
          flexDirection="column"
          bg="white"
          mx={2}
        >
          <Heading fontSize={2} mb={1}>
            {name}
          </Heading>
          <ReactStars mb={1} value={stars} color1="primary" edit={false} />
          <Text fontSize={1} mb={2} color="lightgrey">
            {description}
          </Text>
          <Button>Add to Cart</Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default RecipeCell;
