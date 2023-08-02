import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import { Form, Input, message, Button } from "antd";

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

function JoinCCA({ userID }) {
  async function newMember(values) {
    const { data, error } = await supabase.from("Records").insert({
      cca_id: values.cca_id,
      user_id: userID,
      manager: false
    });

    if (error) {
      message.error(
        "Failed to join the CCA. Wrong code or you are already in the CCA."
      );
    } else {
      message.success("Successfully joined");
      window.location.reload(true);
    }

    // You can return any relevant data after creating the new event
  }

  return (
    <div>
      <h2>Join CCA</h2>
      <p>Please contact your CCA manager for the CCA ID to join the CCA!</p>
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
          <Input placeholder="Enter the CCA ID" maxLength={50} />
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

export default JoinCCA;
