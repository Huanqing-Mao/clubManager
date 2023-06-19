import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker, Space } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
};

const onOk = (value) => {
    console.log('onOk: ', value);
};

const { TextArea } = Input;

function CreateEvent( { currentID, newEvent, hide } ) {


    function onFinish(values) {
        console.log('Received values of form:', values);
        
        newEvent(values, currentID);
    };

  return (
    <Form
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      <Form.Item label="Event name" name="event_name">
        <Input placeholder="Enter the event name" />
      </Form.Item>
      <Form.Item label="Event details" name="details">
      <TextArea rows={4} placeholder="Please enter the event details"/>
      </Form.Item>
      <Form.Item label="Event Date" name="date_time">
        <DatePicker onChange={onChange} onOk={onOk} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="AntButton" onClick={hide}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CreateEvent;