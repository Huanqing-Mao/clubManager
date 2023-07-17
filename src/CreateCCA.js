import { Button, Input, Form, Divider, Space, message } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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

export default function CreateCCA({ userID }) {
  //   const [code, setCode] = useState("");
  //   const [newCCAName, setNewCCAName] = useState("");
  //   const onCodeChange = (event) => {
  //     setCode(event.target.value);
  //   };

  //   const onNameChange = (event) => {
  //     setNewCCAName(event.target.value);
  //   };
  //   const joinCCA = () => {};
  //   const createCCA = () => {};

  async function newCCA(values) {
    const uniqueId = uuidv4();

    const { data, error } = await supabase.from("CCA").insert({
      cca_id: uniqueId,
      cca_name: values.cca_name
    });

    if (error) {
      message.error("Failed to create the CCA.");
    } else {
      setManager(uniqueId);
    }

    // You can return any relevant data after creating the new event
  }

  async function setManager(cca) {
    const { data, error } = await supabase.from("Records").insert({
      cca_id: cca,
      user_id: userID,
      manager: true
    });

    if (error) {
      message.error("Failed to set manager.");
    } else {
      message.success("Successfully created");
      window.location.reload(true);
    }
  }

  return (
    <div>
      <Form
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={newCCA}
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
          label="CCA Name"
          name="cca_name"
          rules={[
            {
              required: true,
              message: "This field is required."
            }
          ]}
        >
          <Input placeholder="Enter CCA Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="AntButton">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
