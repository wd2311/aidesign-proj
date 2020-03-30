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
import IngredientCell from "./IngredientCell.js";

function RecipeCell(props) {
  const { id, title, desc, rating, ingredients } = props.recipe;
  const { onSelection, inCart, onCancel } = props;

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
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      onClick={onCancel}
      sx={{
        backgroundColor: "rgba(0, 0, 0, .4)",
        position: "fixed",
        zIndex: 1
      }}
    >
      <Card
        sx={{ borderRadius: 3 }}
        my={3}
        mr={3}
        width="600px"
        maxHeight="80%"
        overflow="auto"
        px={0}
        py={0}
      >
        <Flex
          width="100%"
          alignItems="stretch"
          flexDirection="column"
          backgroundColor="blue"
        >
          <Image
            src={src}
            height="200px"
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
            <Flex alignItems="center" justifyContent="space-between" mb={1}>
              <Flex alignItems="center">
                <Heading mb={1} mr={1}>
                  {title}
                </Heading>
                <ReactStars
                  mb={1}
                  value={rating}
                  color1="primary"
                  edit={false}
                />
              </Flex>
              <Button
                sx={
                  inCart
                    ? { backgroundColor: "red" }
                    : { ":active": { backgroundColor: "secondary" } }
                }
                my={1}
                onClick={() => {
                  onSelection(props.recipe);
                }}
              >
                {inCart ? "Remove From Cart" : "Add to Cart"}
              </Button>
            </Flex>
            <Text fontSize={1} mb={2} color="lightgrey">
              {desc || "No description."}
            </Text>
            <hr
              class="solid"
              width="100%"
              style={{ border: "0.5px solid rgb(230, 230, 230)" }}
            />
            <Heading fontSize={2} mb={1}>
              Ingredients
            </Heading>
            <hr
              class="solid"
              width="100%"
              style={{ border: "0.5px solid rgb(230, 230, 230)" }}
            />
            <Flex
              overflow="auto"
              backgroundColor="yellow"
              flexDirection="column"
              flexGrow={1}
            >
              {ingredients.map(ingredient => (
                <IngredientCell text={ingredient} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default RecipeCell;
