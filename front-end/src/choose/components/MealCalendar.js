import React, { useState } from "react";
import { Row, Col, Button, Typography, Calendar, Card, Divider } from "antd";
import MealSelection from "./MealSelection.js";
import MealCalendarCell from "./MealCalendarCell.js";

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
          dateFullCellRender={date => (
            <MealCalendarCell
              date={date}
              selected={selectedMeal.date}
              data={mealPlan.filter(d => d.date.isSame(date, "day")).length}
            />
          )}
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

export default MealCalendar;
