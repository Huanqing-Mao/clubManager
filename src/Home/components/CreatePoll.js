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

function CreatePoll( { currentID, newPoll, hide } ) {


    function onFinish(values) {
        console.log('Received values of form:', values);
        newPoll(values);
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
      <Form.Item label="Title" name="poll_name">
        <Input placeholder="Input your poll title" />
      </Form.Item>
      <Form.Item label="Question" name="question">
        <Input placeholder="Input your poll question" />
      </Form.Item>
      <Form.Item label="Poll End Time" name="deadline">
        <DatePicker showTime onChange={onChange} onOk={onOk} />
      </Form.Item>
      <Form.Item label="Poll Options:">
      <Form.List
        name="options"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('At least 2 options'));
              }
            },
          },
        ]}
      >
        
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayout)}
                label={index === 0 ? '' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input an option or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="new option"
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: '60%',
                }}
                icon={<PlusOutlined />}
                className="AntButton"
              >
                Add field
              </Button>
              <Button
                type="dashed"
                onClick={() => {
                  add('The head item', 0);
                }}
                style={{
                  width: '60%',
                  marginTop: '20px',
                }}
                icon={<PlusOutlined />}
                className="AntButton"
              >
                Add field at head
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="AntButton" onClick={hide}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CreatePoll;