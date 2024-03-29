import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, DatePicker, Space } from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 4
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 20
    }
  }
};

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

const onChange = (value, dateString) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};

const onOk = (value) => {
  console.log("onOk: ", value);
};

const { TextArea } = Input;

function CreateEvent({ currentID, newEvent, hide, ccaID }) {
  const [form] = Form.useForm();
  function onFinish(values) {
    console.log("Received values of form:", values);
    newEvent(values, currentID, ccaID);
    hide();
    form.resetFields();
  }

  return (
    <Form
      form={form}
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
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
        label="Event name"
        name="event_name"
        rules={[
          {
            required: true,
            message: "This field is required."
          }
        ]}
      >
        <Input placeholder="Enter the event name" maxLength={50} />
      </Form.Item>
      <Form.Item
        label="Event details"
        name="details"
        rules={[
          {
            required: true,
            message: "This field is required."
          }
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Please enter the event details"
          maxLength={1000}
        />
      </Form.Item>
      <Form.Item
        label="Event Date"
        name="date_time"
        rules={[
          {
            required: true,
            message: "This field is required."
          }
        ]}
      >
        <DatePicker onChange={onChange} onOk={onOk} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="AntButton">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}
export default CreateEvent;
