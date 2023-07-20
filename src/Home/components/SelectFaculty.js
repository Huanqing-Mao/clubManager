import { Select, Space } from "antd";
import { useState, useEffect } from "react";

export default function SelectFaculty({ defaultFac, setFaculty }) {
  const [defaultValue, setDefault] = useState(defaultFac);
  useEffect(() => {
    setDefault(defaultFac);
  }, [defaultFac]);
  const handleChange = (value) => {
    setDefault(value);
    console.log(`selected ${value}`);
  };

  const handleSelect = (value) => {
    setFaculty(value);
  };

  const SelectMenu = () => (
    <Space wrap>
      <Select
        value={defaultValue}
        style={{
          width: 250
        }}
        onChange={handleChange}
        options={[
          {
            value: "CHS",
            label: "CHS"
          },
          {
            value: "Business",
            label: "Business"
          },
          {
            value: "Computing",
            label: "Computing"
          },
          {
            value: "Dentistry",
            label: "Dentistry"
          },
          {
            value: "CDE",
            label: "CDE"
          },
          {
            value: "Law",
            label: "Law"
          },
          {
            value: "Medicine",
            label: "Medicine"
          },
          {
            value: "Nursing",
            label: "Nursing"
          },
          {
            value: "Pharmacy",
            label: "Pharmacy"
          },
          {
            value: "NUS College",
            label: "NUS College"
          },
          {
            value: "Music",
            label: "Music"
          }
        ]}
        onSelect={handleSelect}
      />
    </Space>
  );

  return (
    <div>
      <SelectMenu />
    </div>
  );
}
