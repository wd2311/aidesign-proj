import React from "react";
import { Button, Typography, Divider, Card, Avatar } from "antd";
import { CaretRightOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./title.css";
const { Text, Paragraph } = Typography;

function MealMiniCell(props) {
  console.log(props);
  const { recipe, onClick, onRemove } = props;
  const { title, id, src } = recipe;
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
  const imSrc =
    src ?? tmpImg[Math.floor(Math.random() * tmpImg.length)] + ".jpg";

  return (
    <div
      style={{
        display: "flex",
        marginTop: "5px",
        width: "283px",
        cursor: "pointer",
        justifyContent: "space-between"
      }}
      className="minicell"
    >
      <div style={{ display: "flex", flex: "1 1 auto", minWidth: "0" }}>
        <Avatar
          src={imSrc}
          style={{
            flex: "0 0 20px",
            height: "20px",
            width: "20px",
            marginRight: "5px"
          }}
        />
        <Paragraph
          ellipsis
          style={{ marginBottom: "0px", flex: "1 1 auto" }}
          onClick={e => {
            onClick(recipe);
            e.stopPropagation();
          }}
        >
          {title}
        </Paragraph>
      </div>
      <div className="x" style={{ flex: "0 0 auto" }}>
        <CloseCircleOutlined
          onClick={e => {
            onRemove(recipe);
            e.stopPropagation();
          }}
          style={{ color: "red" }}
        />
      </div>
    </div>
  );
}

function MealSelectionRow(props) {
  const {
    mealDesc,
    meals,
    onRecipeSelection,
    onSelect,
    selected,
    onRemove
  } = props;

  return (
    <div
      onClick={() => onSelect()}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer"
        }}
        className="cell"
      >
        <Text
          strong
          className="hoverable"
          style={{ ...(selected && { color: "#1890FF" }) }}
        >
          {mealDesc}
        </Text>
        <CaretRightOutlined
          className="hoverable"
          style={{ ...(selected && { color: "#1890FF" }) }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}></div>
      {meals.map(meal => {
        console.log(meal);
        return (
          <MealMiniCell
            recipe={meal.recipe}
            onClick={recipe => onRecipeSelection(recipe)}
            onRemove={recipe => onRemove(recipe, mealDesc)}
          />
        );
      })}
    </div>
  );
}
function MealSelection(props) {
  const meals = ["Breakfast", "Lunch", "Dinner"];
  const {
    onSelectMeal,
    onSelectRecipe,
    dayContent,
    selectedMeal,
    onRemove
  } = props;
  return (
    <Card bodyStyle={{ paddingTop: "10px", paddingBottom: "10px" }}>
      {meals.map((meal, index) => (
        <React.Fragment>
          <MealSelectionRow
            selected={selectedMeal === meal}
            mealDesc={meal}
            meals={dayContent.filter(data => data.meal === meal)}
            onSelect={() => onSelectMeal(meal)}
            onRecipeSelection={recipe => onSelectRecipe(recipe, meal)}
            onRemove={onRemove}
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
