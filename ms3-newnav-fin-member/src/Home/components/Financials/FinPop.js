import { Button, Form, Input, Select, Divider } from "antd";
// abandoned version

export default function FinPop() {
  const [form] = Form.useForm();
  const onSemChange = () => {};
  const semList = [1, 2];
  const tagList = [
    "Concerts",
    "Welfare",
    "School Festivals",
    "Public Outreach"
  ];

  const sections = [
    { name: "Group Fund", total: 94 },
    { name: "NUS Operating Budget", total: 95 },
    { name: "Other grants", total: 95 },
    { name: "Notes/Cost Breakdown", total: 95 }
  ];

  return (
    <div>
      <Form layout="vertical" form={form}>
        <Divider
          orientation="left"
          orientationMargin="0"
          style={{ fontSize: "30px" }}
        >
          General Information
        </Divider>
        <Form.Item label="Event Name">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Academic Year">
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item
          label="Semester"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Select
            placeholder="Select Semester"
            onChange={onSemChange}
            allowClear
            options={semList.map((item) => ({
              value: item,
              label: item
            }))}
          ></Select>
        </Form.Item>

        <Form.Item
          label="Event Tag"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Select
            placeholder="Select Tag"
            onChange={onSemChange}
            allowClear
            options={tagList.map((item) => ({
              value: item,
              label: item
            }))}
          ></Select>
        </Form.Item>

        {sections.map((item) => {
          return (
            <div>
              <Divider
                orientation="left"
                orientationMargin="0"
                style={{ fontSize: "30px" }}
              >
                {item.name}
              </Divider>

              <Form.Item label="Creatives (Choreographer/Artistic Director/Production Manager)">
                <Input placeholder="input placeholder" />
              </Form.Item>

              <Form.Item label="Production Cost (Manpower/Venue/Standard)">
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item label="Production Cost (Additional Equipment)">
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item label="Props/Set/Costume">
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item label="Photography/Videography">
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item label="Logistics">
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item label="Welfare (Flowers/Meals)">
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item label="Total Spent">
                <Input placeholder="input placeholder" value={item.total} />
                {/* value is automatic sum of all fields*/}
              </Form.Item>
            </div>
          );
        })}
      </Form>
    </div>
  );
}
