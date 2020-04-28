import React, { useState } from "react";
import { Row, Col, Button, Typography, Calendar, Modal, Divider } from "antd";
import ReactStars from "react-stars";
import { CalendarOutlined } from "@ant-design/icons";
import "antd/lib/button/style/index.css";
const { Text, Paragraph } = Typography;

function ModalContent(props) {
  const {
    id,
    recipe_name: title,
    desc,
    rating,
    recipe_img,
    ingredients
  } = props.recipe;

  const parseIngredients = ingredients.map(
    ([fullname, ingredient, count, unit, price]) => {
      return {
        fullname,
        ingredient,
        count,
        unit,
        price
      };
    }
  );
  console.log(parseIngredients);
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

  const imsrc =
    recipe_img ?? tmpImg[Math.floor(Math.random() * tmpImg.length)] + ".jpg";

  const recipe_rating = rating ?? Math.floor(Math.random() * 6);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center"
      }}
    >
      <img
        src={imsrc}
        style={{
          objectFit: "cover",
          height: "200px",
          borderRadius: "2px 2px 0px 0px"
        }}
      />
      <div
        style={{ padding: "10px", display: "flex", flexDirection: "column" }}
      >
        <div style={{ flex: "0 0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <Text strong style={{ whiteSpace: "normal" }}>
                {title}
              </Text>
              <ReactStars
                mb={1}
                value={recipe_rating}
                color1="primary"
                edit={false}
              />
            </div>
          </div>
          <Paragraph>{desc ?? "No description."}</Paragraph>
          <Divider>Ingredients</Divider>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            maxHeight: "300px",
            overflow: "auto"
          }}
        >
          {parseIngredients.map((ingredientObj, index) => {
            const { fullname, ingredient, count, unit, price } = ingredientObj;
            return (
              <div
                style={{
                  flex: "1 1 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "5px",
                  ...(index % 2 && { backgroundColor: "WhiteSmoke" })
                }}
              >
                <Paragraph style={{ flex: "0 0 auto", margin: 0 }} ellipsis>
                  <strong>
                    {count && count + " "}
                    {unit && unit + " "}
                  </strong>
                  {ingredient}
                </Paragraph>
                <Paragraph style={{ color: "green", margin: 0 }}>
                  {price}
                </Paragraph>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RecipeDetail(props) {
  const { recipe, onClose, onAddToCart, inCart } = props;
  return (
    <Modal
      title={null}
      visible={recipe != null}
      bodyStyle={{ padding: "0px" }}
      onCancel={() => onClose()}
      footer={
        <Button
          type={inCart ? "warning" : "primary"}
          onClick={() => {
            onAddToCart(recipe);
            onClose();
          }}
          icon={<CalendarOutlined />}
          size="medium"
        >
          {inCart ? "Remove from Plan" : "Add to Plan"}
        </Button>
      }
    >
      {recipe && <ModalContent recipe={recipe} />}
    </Modal>
  );
}

export default RecipeDetail;
