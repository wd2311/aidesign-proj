import React, { useState } from "react";
import { Row, Col, Button, Typography, Calendar, Card, Divider } from "antd";
import MealSelection from "./MealSelection.js";
import moment from "moment";

function MealCalendar(props) {
  const {
    mealPlan,
    selectedMeal,
    onSelectMeal,
    onSelectRecipe,
    onRemove
  } = props;
  console.log(selectedMeal);
  return (
    <div style={{ flex: "1 1 400px" }}>
      <Card style={{ marginBottom: "20px" }}>
        <Calendar
          fullscreen={false}
          defaultValue={null}
          dateFullCellRender={date =>
            dateFullCellRender(
              date,
              selectedMeal.date,
              mealPlan.filter(d => d.date.isSame(date, "day")).length
            )
          }
          onChange={moment => {
            onSelectMeal({ date: moment.startOf("day"), meal: null });
          }}
        />
      </Card>
      <MealSelection
        dayContent={mealPlan.filter(d =>
          d.date.isSame(selectedMeal.date, "day")
        )}
        selectedMeal={selectedMeal.meal}
        onSelectRecipe={onSelectRecipe}
        onSelectMeal={meal =>
          onSelectMeal({ date: selectedMeal.date, meal: meal })
        }
        onRemove={onRemove}
      />
    </div>
  );
}

function dateFullCellRender(date, selected, data) {
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

export default MealCalendar;
