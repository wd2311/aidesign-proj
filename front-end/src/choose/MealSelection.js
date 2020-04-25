import React from "react";
import { Button, Typography, Divider, Card, Avatar } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Text } = Typography;

function MealMiniCell(props) {
  console.log(props);
  const { recipe, onClick } = props;
  const { name, id, src } = recipe;
  return (
    <div style={{ marginTop: "5px" }}>
      <Avatar
        src={src}
        style={{
          height: "20px",
          width: "20px",
          marginRight: "5px"
        }}
      />
      <Text onClick={() => onClick(recipe)}>{name}</Text>
    </div>
  );
}

function MealSelectionRow(props) {
  const { mealDesc, meals, onRecipeSelection, onSelect, selected } = props;
  console.log(mealDesc);
  console.log(meals);
  return (
    <div
      onClick={() => onSelect()}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text strong={selected}>{mealDesc}</Text>
        <CaretRightOutlined />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}></div>
      {meals.map(meal => {
        console.log(meal);
        return (
          <MealMiniCell
            recipe={meal.recipe}
            onClick={recipe => onRecipeSelection(recipe)}
          />
        );
      })}
    </div>
  );
}
function MealSelection(props) {
  const meals = ["Breakfast", "Lunch", "Dinner"];
  const { onSelectMeal, onSelectRecipe, dayContent, selectedMeal } = props;
  return (
    <Card bodyStyle={{ paddingTop: "10px", paddingBottom: "10px" }}>
      {meals.map((meal, index) => (
        <React.Fragment>
          <MealSelectionRow
            selected={selectedMeal === meal}
            mealDesc={meal}
            meals={dayContent.filter(data => data.meal === meal)}
            onSelect={() => onSelectMeal(meal)}
            onRecipeSelection={recipe => onSelectRecipe(recipe)}
          />
          {index !== meals.length - 1 && (
            <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
          )}
        </React.Fragment>
      ))}
    </Card>
  );
}

export default MealSelection;
