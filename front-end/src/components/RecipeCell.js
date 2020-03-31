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

  var trimmedDesc =
    desc && (desc.length > 128 ? desc.substring(0, 128 - 3) + "..." : desc);

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
      <Flex
        width="100%"
        height="100%"
        alignItems="stretch"
        flexDirection="column"
      >
        <Image
          src={src}
          height="100px"
          width="100%"
          flexGrow={0}
          mb={2}
          sx={{ borderRadius: "3px 3px 0 0", objectFit: "cover" }}
        />
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          bg="white"
          mx={2}
          flexGrow={1}
        >
          <Flex justifyContent="start" flexDirection="column">
            <Heading fontSize={2} mb={1}>
              {title}
            </Heading>
            <ReactStars mb={1} value={rating} color1="primary" edit={false} />
            <Text fontSize={1} mb={2} color="lightgrey">
              {trimmedDesc || "No description."}
            </Text>
          </Flex>
          <Button
            sx={
              inCart
                ? { backgroundColor: "red" }
                : { ":active": { backgroundColor: "secondary" } }
            }
            onClick={e => {
              onSelection(props.recipe);
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
