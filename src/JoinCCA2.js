import { Button, Input, Form, Divider, Space, message } from "antd";
import { useState } from "react";
import { supabase } from "./supabase";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 20,
      offset: 4
    }
  }
};

export default function JoinCCA({ userID }) {
  // const [code, setCode] = useState("");
  // const [newCCAName, setNewCCAName] = useState("");
  // const onCodeChange = (event) => {
  //   setCode(event.target.value);
  // };

  // const onNameChange = (event) => {
  //   setNewCCAName(event.target.value);
  // };
  // const joinCCA = () => {};
  // const createCCA = () => {};

  async function newMember(values) {
    const { data, error } = await supabase.from("Records").insert({
      cca_id: values.cca_id,
      user_id: userID,
      manager: false
    });

    if (error) {
      message.error("Failed to join the CCA.");
    } else {
      message.success("Successfully joined");
    }

    // You can return any relevant data after creating the new event
  }
  return (
    <div>
      <Form
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={newMember}
        style={{
          maxWidth: 600
        }}
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
      >
        <Form.Item
          label="CCA ID"
          name="cca_id"
          rules={[
            {
              required: true,
              message: "This field is required."
            }
          ]}
        >
          <Input placeholder="Enter the CCA ID" maxLength={100} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="AntButton">
            Join
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
