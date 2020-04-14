import React from "react";

import { Typography } from "antd";

const { Title, Text } = Typography;

function Navbar(props) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
        zIndex: "1"
      }}
    >
      <Title
        level={3}
        style={{
          margin: "0",
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block"
        }}
      >
        Food
      </Title>
    </div>
  );
}

export default Navbar;
