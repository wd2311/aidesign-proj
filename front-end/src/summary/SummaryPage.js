import React, { useState } from "react";
import { Row, Col, Divider, Button, Typography } from "antd";

import { Form, Radio, Card, Checkbox, Input, Select, Avatar } from "antd";
import RecipeDetail from "../RecipeDetailV2";
import moment from "moment";

const { Title, Text, Paragraph } = Typography;

const { Option } = Select;
function MealMiniCell(props) {
  console.log(props);
  const { recipe, onClick } = props;
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
        cursor: "pointer"
      }}
    >
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
        style={{ marginBottom: "0px" }}
        onClick={() => onClick(recipe)}
      >
        {title}
      </Paragraph>
    </div>
  );
}

function convertMealPlanToHash(mealPlan) {
  const map = new Map();
  mealPlan.forEach(meal => {
    const key = meal.date.format("YYYY-MM-DD ") + meal.meal;
    if (map.has(key)) {
      map.set(key, map.get(key).concat[meal.recipe]);
    } else {
      map.set(key, [meal.recipe]);
    }
  });
  return map;
}

function SummaryPage(props) {
  const { onClicked, mealPlan } = props;
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const map = convertMealPlanToHash(mealPlan);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "40px",
        backgroundColor: "WhiteSmoke"
      }}
    >
      <Title
        style={{
          margin: "5px"
        }}
      >
        All Done!
      </Title>
      <Text>Thank you for letting us help plan your next shopping trip!</Text>
      <RecipeDetail
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flex: "1 1 auto"
        }}
      >
        <Card
          style={{ width: "400px", marginRight: "40px" }}
          bodyStyle={{ maxHeight: "400px" }}
          title="Meal Plan"
        >
          {Array.from(map.keys()).map((key, idx) => {
            const parts = key.split(" ");
            const date = moment(parts[0]).format("dddd, MMMM Do");
            const string = date + " - " + parts[1];
            const recipes = map.get(key);
            return (
              recipes && (
                <React.Fragment>
                  <Divider>{string}</Divider>
                  {recipes.map(recipe => (
                    <MealMiniCell
                      recipe={recipe}
                      onClick={recipe => setSelectedRecipe(recipe)}
                    />
                  ))}
                </React.Fragment>
              )
            );
          })}
        </Card>
        <Card
          style={{
            width: "400px",
            maxHeight: "400px",
            display: "flex",
            flexDirection: "column"
          }}
          bodyStyle={{ overflowY: "scroll", flex: "1 1 auto" }}
          title="Shopping List"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto"
            }}
          >
            {Array.from(map.keys()).map((key, idx) => {
              const recipes = map.get(key);
              return (
                recipes &&
                recipes.map(recipe => (
                  <React.Fragment>
                    {idx !== 0 && <Divider />}
                    {recipe.ingredients.map(ingredient => (
                      <Paragraph ellipsis>{ingredient}</Paragraph>
                    ))}
                  </React.Fragment>
                ))
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SummaryPage;
