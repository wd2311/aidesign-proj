import React from "react";
import { Row, Col, Button, Typography, Card } from "antd";
import InfoCard from "../components/InfoCard.js";

const { Title, Text } = Typography;

function WelcomePage(props) {
  const { onClicked } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}
    >
      <Title>Welcome!</Title>
      <Text
        style={{ maxWidth: "60%", whiteSpace: "normal", textAlign: "center" }}
      >
        Let us help you build a shopping list optimized for your needs! How does
        it work? In just 3 steps you can put together an optimized shopping list
        for your next trip to the grocery store.
      </Text>
      <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
        <InfoCard
          number={1}
          title="Tell about you!"
          content="Tell us: \n1. Some info."
        />
        <InfoCard
          number={2}
          title="Pick customized recipes!"
          content="Get custom recomendations for each meal that you are shopping for based on similarity to ingredients you alread have, ingredients in meals you have selected."
        />
        <InfoCard
          number={3}
          title="Shop!"
          content="We provide you with a shopping list and a list of recipes for you to come back to when it is time to cook."
        />
      </div>
      <Button
        style={{ marginTop: "50px" }}
        onClick={onClicked}
        size="large"
        type="primary"
      >
        Begin.
      </Button>
    </div>
  );
}

export default WelcomePage;
