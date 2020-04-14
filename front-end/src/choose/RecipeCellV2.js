import React from "react";
import ReactStars from "react-stars";
import { Button, Typography, Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

function RecipeCell(props) {
  const { recipe, onSelect } = props;
  const { id, name, desc, stars, src } = recipe;

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
    <Card
      style={{
        width: "150px",
        padding: "0px",
        marginRight: "20px",
        marginBottom: "20px"
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
            {name}
          </Text>
          <ReactStars mb={1} value={stars} color1="primary" edit={false} />
          <Button type="primary" icon={<CalendarOutlined />} size="small">
            Add to Plan
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default RecipeCell;
