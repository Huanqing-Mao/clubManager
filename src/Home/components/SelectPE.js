import { Select, Space } from "antd";
import { useState, useEffect } from "react";

export default function SelectPE({ defaultPE, setPE }) {
  const [defaultValue, setDefault] = useState(defaultPE);
  //const defaultValue = defaultPE;
  useEffect(() => {
    setDefault(defaultPE);
  }, [defaultPE]);
  const handleChange = (value) => {
    setDefault(value);
    console.log(`selected ${value}`);
  };

  const handleSelect = (value) => {
    setPE(value);
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
            value: "No Prior Experience",
            label: "No Prior Experience"
          },
          {
            value: "With Prior Experience",
            label: "With Prior Experience"
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
