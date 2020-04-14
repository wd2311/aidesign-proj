import React from "react";
import { Row, Col, Button, Typography, Calendar, Card, Divider } from "antd";
const { Title, Text } = Typography;

function InfoCard(props) {
  const { number, title, content } = props;
  return (
    <Card
      style={{
        height: "275px",
        width: "250px",
        margin: "10px"
      }}
      bodyStyle={{
        padding: "0px"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "0px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "5px",
            margin: "5px"
          }}
        >
          <Text
            strong
            style={{
              margin: "0px",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              padding: "0px",
              background: "#fff",
              border: "2px solid black",
              color: "black",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              marginRight: "5px",
              justifyContent: "center",
              flexShrink: "0"
            }}
          >
            {number}
          </Text>
          <Text
            style={{
              margin: "0px",
              fontSize: "16px",
              color: "black",
              fontWeight: "500"
            }}
          >
            {title}
          </Text>
        </div>
        <Divider style={{ margin: "0px" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "10px"
          }}
        >
          <Text style={{ whiteSpace: "normal" }}>{content}</Text>
        </div>
      </div>
    </Card>
  );
}
export default InfoCard;
