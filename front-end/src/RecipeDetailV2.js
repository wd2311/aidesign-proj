import React, { useState } from "react";
import { Row, Col, Button, Typography, Calendar, Modal, Divider } from "antd";
import ReactStars from "react-stars";
import { CalendarOutlined } from "@ant-design/icons";
import "./choose/title.css";
import "antd/lib/button/style/index.css";
const { Text, Paragraph } = Typography;

function ModalContent(props) {
  const { id, name, description, stars, src } = props.recipe;
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
      <div style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <Text strong style={{ whiteSpace: "normal" }}>
              {name}
            </Text>
            <ReactStars mb={1} value={stars} color1="primary" edit={false} />
          </div>
          <Button type="primary" icon={<CalendarOutlined />} size="medium">
            Add to Plan
          </Button>
        </div>
        <Paragraph>{description}</Paragraph>
        <Divider>Ingredients</Divider>
      </div>
    </div>
  );
}

function RecipeDetail(props) {
  const { recipe, onClose } = props;
  return (
    <Modal
      title={null}
      footer={null}
      visible={recipe != null}
      bodyStyle={{ padding: "0px" }}
      onCancel={() => onClose()}
    >
      {recipe && <ModalContent recipe={recipe} />}
    </Modal>
  );
}

export default RecipeDetail;
