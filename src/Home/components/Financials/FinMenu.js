import { LineChartOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";

export default function FinMenu({ setPage }) {
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
    const [current, setCurrent] = useState("records");
    const onClick = (e) => {
      //console.log(e);
      //console.log(e.key);
      //setCurrent(e.key);
      //console.log("current:", current);
      setPage(e.key);
    };

    return (
      <Menu
        onClick={onClick}
        mode="horizontal"
        items={items}
        onSelect={onClick}
      />
    );
  };
  return <Menubar />;
}
