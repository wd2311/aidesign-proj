import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Button, Typography } from "antd";

import { Form, Radio, Card, Checkbox, Input, Select, InputNumber } from "antd";

const { Title, Text } = Typography;

const { Option } = Select;

const ingredients = [
  "pickled radishes, carrots, and celery root",
  "black radishes",
  "daikon radishes",
  "baby radishes",
  "radishes, sweet gherkins",
  "radishes radishes",
  "red radishes",
  "lime radishes",
  "cilantro sprigs, sliced radishes",
  "radishes celery",
  "fresh chives, thyme, and radishes",
  "oz radishes",
  "french breakfast radishes",
  "watermelon radish radishes",
  "watermelon radishes radishes",
  "watermelon radishes",
  "red onion radishes",
  "iceberg lettuce radishes",
  "flaky sea salt and horseradish-yogurt sauce",
  "horseradish-yogurt sauce",
  "cherry yogurt",
  "banana-strawberry frozen yogurt",
  "banana-strawberry yogurt",
  "roasted beets with horseradish cr\u00e8me fra\u00eeche",
  "beer and horseradish mustard",
  "mustard-horseradish sauce",
  "mustard mashed potatoes",
  "accompaniment:mustard mashed potatoes",
  "peach mustard",
  "stemmed mustard greens",
  "mustard greens or kale",
  "curly mustard greens",
  "coarsely chopped trimmed mustard greens",
  "mustard greens",
  "mustard greens, turnip greens",
  "stemmed red mustard greens",
  "baby mustard greens",
  "6-7-ounce mustard greens",
  "pickled mustard greens",
  "lb mustard greens",
  "baby kale mustard greens",
  "mixed turnip, mustard, and collard greens",
  "each matchstick-size pieces peeled carrots, cucumbers, and radishes",
  "carrots and onions",
  "orange carrots",
  "sour cream horseradish",
  "sour cream and onion dip",
  "pineapple spears and lemon slices",
  "pineapple spears, maraschino cherries",
  "pineapple spears",
  "pears dates",
  "anjou pears",
  "seckel pears",
  "hard pears",
  "sour pickle spears",
  "barlett pears",
  "lb pears",
  "pickled pears",
  "asian pears**",
  "pears",
  "cooking pears",
  "moonglow pears",
  "firm-ripe pears lemon",
  "poached pears with cranberry puree",
  "bose pears",
  "pita chips and/or cucumber spears",
  "dill pickle spears",
  "asian pears",
  "yellow belgian endive spears",
  "7-ounce asian pears",
  "bosc pears",
  "bartlett pears",
  "firm-ripe pears",
  "bosc pears (1 to 1 1/4 pounds total",
  "endive radicchio spears",
  "cucumber spears",
  "firm-ripe red bartlett pears",
  "underripe medium-sized pears",
  "mango spears",
  "firm-ripe baby pineapples with leaves",
  "pineapples",
  "pineapple strawberries",
  "strawberries strawberry jam",
  "berries mango",
  "fruit strawberries and kiwifruit",
  "4 1/2-pound pineapple",
  "2 3/4-pound piece of watermelon",
  "1/2-pound potato",
  "3-to 3 1/4-pound butternut squash",
  "1 3/4-pound papaya",
  "honeydew melon (5 pounds), chilled",
  "cantaloupe melon (1 1/2 pounds)",
  "1 3/4-pound cantaloupe",
  "1 1/2-pound red cabbage",
  "mixed greens with raspberry vinaigrette",
  "onion greens, to garnish",
  "medium-size greens spinach",
  "greens beet greens, swiss chard, kale, collards, mustard greens, turnip greens",
  "salad greens baby kale, or spinach",
  "leafy greens (kale, collards, and mustard",
  "greens baby kale, or collards",
  "collard greens slaw",
  "collard greens",
  "lb collard greens",
  "turnip greens or kale",
  "turnip greens",
  "turnip greens, kale, or mustard greens",
  "oz pear tomatoes",
  "yellow pear tomatoes tomatoes",
  "yellow pear tomatoes",
  "pear tomatoes",
  "cherry tomatoes tomatoes",
  "basket cherry tomatoes",
  "cherry tomatoes",
  "lb cherry tomatoes",
  "cherry tomatoes tomatoes tomatoes",
  "200 grams cherry tomatoes",
  "heirloom cherry tomatoes",
  "mixed cherry tomatoes",
  "tomato cherry tomatoes",
  "bags cherry tomatoes",
  "red cherry tomatoes",
  "baskets cherry tomatoes",
  "vine-ripened cherry tomatoes",
  "mixed-color cherry tomatoes",
  "confit cherry tomatoes",
  "yellow cherry tomatoes",
  "cherry tomato (about 20 tomatoes)",
  "grape tomatoes tomatoes",
  "grape tomatoes",
  "tomatoes with green pepper and onion",
  "tomatoes with garlic and onion",
  "red, yellow, and orange tomatoes",
  "small red, yellow, and orange cherry tomatoes",
  "lbs plum tomatoes",
  "yellow heirloom plum tomatoes",
  "plum tomatoes",
  "large ripe plum tomatoes",
  "chopped seeded diced plum tomatoes",
  "lb plum tomatoes",
  "yellow baby plum tomatoes tomatoes",
  "plum tomatoes tomatoes",
  "plum tomatoes tomatoes diced",
  "italian plum tomatoes",
  "plum tomatoes, seeded, cut into 1/4-inch pieces",
  "plum tomatoes, drained, reserving juice",
  "tomatoes plum tomatoes",
  "plum tomatoes tomatoes chopped",
  "red heirloom plum tomatoes",
  "lb ripe plum tomatoes",
  "plum tomatoes, drained, seeded, and diced",
  "iceberg lettuce tomatoes cheddar cheese",
  "tomatoes celery sticks",
  "lb beefsteak tomatoes",
  "medium beefsteak tomatoes",
  "yellow beefsteak tomatoes",
  "large beefsteak tomatoes",
  "beefsteak tomatoes",
  "tomatoes with green peppers",
  "roma tomatoes",
  "lb roma tomatoes",
  "pearled barley",
  "pearl barley",
  "vegetables cauliflower, carrots, and pearl onions",
  "accompaniment: potato cauliflower",
  "cauliflower florets",
  "lb jerusalem artichokes",
  "grilled lemons, baby artichokes",
  "lb/455 g jerusalem artichokes",
  "large artichokes",
  "jerusalem artichokes*",
  "artichokes artichoke hearts, thawed",
  "special equipment: a 6- to 8-qt heavy pot wide enough to hold artichokes",
  "jerusalem artichokes",
  "ingredient info: jerusalem artichokes",
  "baby artichokes, 6 globe artichokes artichoke hearts",
  "lb artichokes",
  "purple artichokes",
  "jar marinated artichokes",
  "artichokes",
  "jerusalem artichokes *",
  "baby artichokes",
  "globe artichokes",
  "relishes watermelon bell peppers",
  "red cherry peppers red chilies",
  "pickled cherry peppers",
  "cherry peppers peppers",
  "hot cherry peppers",
  "cherry peppers",
  "onions and bell peppers",
  "orange, and red bell peppers",
  "bell peppers orange peppers",
  "bell peppers (1 yellow, 1 orange",
  "bell peppers orange",
  "mini sweet peppers (1 yellow, 1 orange",
  "orange bell peppers",
  "red peppers, drained, cut into thin strips",
  "sweet red peppers",
  "roasted red peppers",
  "red peppers",
  "red bell pepper red peppers",
  "peppers red peppers peppers",
  "sweet red peppers, such as frying peppers, cubanelles or bell peppers",
  "red peppers, drained, seeded, and coarsely chopped",
  "red peppers, drained, cut into strips",
  "green peppers",
  "cherrystone clams",
  "muscat grapes grapes",
  "green grapes",
  "grapes",
  "champagne grapes",
  "concord grapes grapes",
  "concord grapes",
  "red grapes",
  "purchased lemon-infused grapeseed oil",
  "tbsp grapeseed oil",
  "black grapes",
  "green seedless grapes",
  "grapeseed oil*",
  "grapeseed oil oil",
  "black corinth grapes",
  "grapeseed oil",
  "grape nuts cereal",
  "grape nuts",
  "chestnuts orange halves*",
  "batch orange-brown butter wet nuts",
  "onion puree olive oil, 1 onion vinegar",
  "olive oil for brushing onions",
  "olive oil onion",
  "olive oil for brushing onion and tortillas",
  "olive oil, plus additional for potatoes",
  "olive oil and garlic whipped potatoes",
  "olive oil mango salsa",
  "onion, celery and fennel",
  "celery root mashed potatoes",
  "celery root puree potatoes",
  "vegetables celery root, purple potatoes potatoes",
  "accompaniment if desired: apple and celery salad",
  "lb celery root, and sweet potatoes",
  "carrot and celery sticks",
  "celery sticks",
  "garnish parsley onion olives",
  "parsley broccoli spinach tomatoes",
  "green onion pork sausage",
  "chicken-apple sausages",
  "whole green onions green onions",
  "cherries orange",
  "orange cream cheese frosting",
  "cream cheese-orange frosting",
  "firm-ripe 6-to 8-ounces avocados",
  "firm-ripe california avocados",
  "hass avocados",
  "avocados",
  "california avocados",
  "large ripe avocados",
  "firm-ripe avocados",
  "avocados water",
  "bagels, capers, sliced avocados, sliced cucumbers, watercress, and sliced scallions",
  "hass ripe avocados",
  "asparagus stalks",
  "asparagus spears",
  "lb asparagus",
  "asparagus spears, trimmed, cut into 1 3/4-inch pieces",
  "green asparagus",
  "asparagus, trimmed, cut into 4-inch lengths",
  "white asparagus",
  "asparagus with sauce maltaise",
  "asparagus spears (about 2 pounds), trimmed to about 5 inchesand peeled asparagus spears",
  "asparagus spear",
  "asparagus",
  "asparagus spears, trimmed, cut into 1-inch pieces",
  "asparagus tips",
  "asparagus spears, trimmed to 4-inch lengths",
  "asparagus tips peas",
  '3/4"-inch asparagus',
  "potato pasta",
  "potato pasta",
  "recipe fresh spinach pasta dough",
  "recipe fresh spinach pasta dough",
  "accompaniment: purple-potato and crab gratin",
  "crab apple jelly",
  "crabapples",
  "accompaniment: spicy garlic potatoes and zucchini",
  "apple bananas",
  "ripe bananas, peeled and halved",
  "bananas",
  "finger bananas bananas",
  "bananas split and",
  "very ripe large bananas",
  "bananas, cut into 1/4-inch dice",
  "firm-ripe bananas",
  "chinese bananas (dwarf bananas bananas",
  "bananas, cut lengthwise",
  "finger bananas",
  "bananas (from about 3 bananas)",
  "ripe bananas, mashed",
  "ripe bananas",
  "mashed ripe bananas (about 3 large)",
  "small ripe finger bananas",
  "overly ripe bananas",
  "bananas slices (optional)",
  "small bananas, peeled, quartered lengthwise, trimmed to 4 inches",
  "bananas (about 3 large)",
  "overripe bananas",
  "batch stovetop butterscotch apples and cranberries",
  "pomegranate seeds cranberries",
  "applewood-smoked bacon",
  "apple eggplants",
  "250 g apricots",
  "1/3-inch cubes apricots",
  "candied apricots",
  "firm-ripe apricots",
  "lb apricots",
  "california apricots**",
  "100 g apricots",
  "california apricots",
  "turkish apricots",
  "apricot preserves turkish apricots",
  "lb firm-ripe apricots",
  "fruits apricots",
  "apricots",
  "mango apricots",
  "saut\u00e9ed peaches",
  "lb ripe peaches",
  "peaches",
  "spiced peaches and raspberries",
  "dried peaches",
  "unsweetened peaches"
];
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const Demo = () => {
  const [form] = Form.useForm();

  const onGenderChange = value => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        return;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        return;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        return;
    }
  };

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male"
    });
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="note" label="Note" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) => {
          return getFieldValue("gender") === "other" ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};

function TellUsPage(props) {
  const { onClicked } = props;
  const [allergys, setAllergys] = useState([]);
  const [pantry, setPantry] = useState([]);
  const [pantryOptions, setPantryOptions] = useState(ingredients);
  useEffect(() => {
    fetch("http://localhost:5000/get_all_ingredient_names/")
      .then(res => res.json())
      .then(response => {
        const fetchedPantry = response["recommendations"];
        console.log(fetchedPantry);
        setPantryOptions(fetchedPantry);
      });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",

        backgroundColor: "WhiteSmoke"
      }}
    >
      <Title
        style={{
          margin: "5px"
        }}
      >
        Tell Us Your Needs!
      </Title>
      <Text
        style={{
          maxWidth: "50%",
          whiteSpace: "normal",
          textAlign: "center",
          margin: "20px"
        }}
      >
        Help us understand your dietary and shopping needs. This information
        will help up make a shopping list customized to your needs!
      </Text>
      <Card style={{ margin: "50px", width: "50%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
          }}
        >
          <Text strong style={{ margin: "10px" }}>
            How many people do you need to feed?
          </Text>
          <InputNumber min={1} size="large" />
          <Text strong style={{ margin: "10px", marginTop: "30px" }}>
            Do you have any dietary needs?
          </Text>
          <Checkbox.Group
            onChange={value => setAllergys(value)}
            options={["Dairy", "Nuts", "Shellfish", "Gluten"]}
          />
          <Text strong style={{ margin: "10px", marginTop: "30px" }}>
            What ingredients do you already have?
          </Text>
          <Select
            mode="multiple"
            style={{ width: "50%" }}
            placeholder="Please select"
            onChange={value => setPantry(value)}
            size="large"
          >
            {pantryOptions.map(ingredient => (
              <Option key={ingredient}>{ingredient}</Option>
            ))}
          </Select>
        </div>
      </Card>
      <Button
        style={{ marginTop: "50px" }}
        onClick={() => onClicked(allergys, pantry)}
        size="large"
        type="primary"
      >
        Continue.
      </Button>
    </div>
  );
}

export default TellUsPage;
