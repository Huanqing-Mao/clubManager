import {
  EditOutlined,
  UserOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Menu } from "antd";

export default function Menubar({ setPage }) {
  function getItem(label, key, icon, type) {
    return {
      key,
      icon,
      label,
      type
    };
  }
  const items = [
    getItem("My Profile", "myProfile", <UserOutlined />),
    {
      type: "divider"
    },
    getItem("Update Profile", "update", <EditOutlined />),
    {
      type: "divider"
    },
    getItem("Log Out", "logout", <LogoutOutlined />)
  ];
  const Menus = () => {
    const onClick = (e) => {};

    const onSelect = (item) => {
      setPage(item.key);
    };
    return (
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="horizontal"
        items={items}
        onSelect={onSelect}
      />
    );
  };

  return (
    <div>
      <Menus />
    </div>
  );
}
