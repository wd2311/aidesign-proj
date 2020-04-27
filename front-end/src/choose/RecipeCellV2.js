import React from "react";
import ReactStars from "react-stars";
import { Button, Typography, Card, Divider } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

function RecipeCell(props) {
  const { recipe, onSelect, onAddToCart } = props;
  const { id, title, description, rating, src } = recipe;

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
    src ?? tmpImg[Math.floor(Math.random() * tmpImg.length)] + ".jpg";
  return (
    <div style={{ marginRight: "20px", marginBottom: "20px" }}>
      <Card
        style={{
          width: "150px",
          padding: "0px",

          cursor: "pointer"
        }}
        bodyStyle={{
          padding: "0px"
        }}
        onClick={() => onSelect(recipe)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            padding: "0px",
            width: "100%"
          }}
        >
          <img src={imsrc} style={{ objectFit: "cover", height: "75px" }} />
          <div
            style={{
              padding: "5px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch"
            }}
          >
            <Text strong style={{ whiteSpace: "normal" }}>
              {title}
            </Text>
            <ReactStars mb={1} value={rating} color1="primary" edit={false} />
            <Divider style={{ margin: "5px 0" }} />
            <Button
              type="primary"
              onClick={e => {
                onAddToCart(recipe);
                e.stopPropagation();
              }}
              icon={<CalendarOutlined />}
              size="small"
            >
              Add to Plan
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RecipeCell;
