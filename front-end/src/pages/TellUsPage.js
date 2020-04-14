import React from "react";
import { Row, Col, Divider, Button, Typography } from "antd";

import { Form, Radio, Card, Checkbox, Input, Select, InputNumber } from "antd";

const { Title, Text } = Typography;

const { Option } = Select;

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
      <Card style={{ margin: "50px" }}>
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
          <Checkbox.Group options={["Nuts", "Meat", "Gluten"]} />
        </div>
      </Card>
      <Button
        style={{ marginTop: "50px" }}
        onClick={onClicked}
        size="large"
        type="primary"
      >
        Continue ->
      </Button>
    </div>
  );
}

export default TellUsPage;
