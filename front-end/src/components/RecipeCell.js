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
  const { id, title, desc, rating } = props.recipe;
  const { onSelection, inCart, onRecipeSelection } = props;

  const tmpImg = [
    "alfredo",
    "bolognese",
    "chicken",
    "indian",
    "keto",
    "meatballs",
    "pasta",
    "salad",
    "thai",
    "tikka"
  ];
  const src = tmpImg[Math.floor(Math.random() * tmpImg.length)] + ".jpg";

  return (
    <Card
      sx={{ borderRadius: 3 }}
      my={3}
      mr={3}
      width={200}
      px={0}
      pt={0}
      onClick={() => {
        onRecipeSelection(props.recipe);
      }}
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
            {title}
          </Heading>
          <ReactStars mb={1} value={rating} color1="primary" edit={false} />
          <Text fontSize={1} mb={2} color="lightgrey">
            {desc}
          </Text>
          <Button
            sx={
              inCart
                ? { backgroundColor: "red" }
                : { ":active": { backgroundColor: "secondary" } }
            }
            onClick={e => {
              console.log(id);
              onSelection(id);
              e.stopPropagation();
            }}
          >
            {inCart ? "Remove From Cart" : "Add to Cart"}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default RecipeCell;
