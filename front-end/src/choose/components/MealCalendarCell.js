import React from "react";

import moment from "moment";

function MealCalendarCell(props) {
  const { date, selected, data } = props;
  const isSelected = selected.isSame(date, "day");
  const isToday = date.isSame(moment(), "day");
  return (
    <div
      style={{
        height: "100%",
        borderRadius: "5%",
        ...(isSelected && { backgroundColor: "#1890FF" })
      }}
    >
      <p
        style={{
          marginBottom: "0px",
          height: "100%",
          width: "100%",
          ...(isToday && { color: "#1890FF" }),
          ...(isSelected && { color: "white" })
        }}
      >
        {date.format("D")}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          width: "100%",
          height: "5px",
          left: "0px",
          top: "25px"
        }}
      >
        {[...Array(data).keys()].map(() => (
          <div
            style={{
              height: "5px",
              width: "5px",
              margin: "0px 1px 0px 1px",
              borderRadius: "50%",
              backgroundColor: isSelected ? "white" : "#1890FF"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default MealCalendarCell;
