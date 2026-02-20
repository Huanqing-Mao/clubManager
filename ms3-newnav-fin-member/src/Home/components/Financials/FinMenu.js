import { LineChartOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";

export default function FinMenu({ setPage }) {
  const [current, setCurrent] = useState("records");
  const items = [
    {
      label: "Financial Records",
      key: "records",
      icon: <FileSearchOutlined />
    },
    {
      label: "Data Visualisation",
      key: "vis",
      icon: <LineChartOutlined />
    }
  ];
  const Menubar = () => {
    const onClick = (e) => {
      //console.log(e);
      setCurrent(e.key);

      setPage(e.key);
    };

    return (
      <Menu
        onClick={onClick}
        mode="horizontal"
        items={items}
        selectedKeys={[current]}
        onSelect={onClick}
      />
    );
  };
  return <Menubar />;
}
