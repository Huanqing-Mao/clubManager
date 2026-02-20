import { Menu, Divider } from "antd";

export default function FilesMenu({ items, setFolderName }) {
  const Vert = () => {
    const onClick = (e) => {
      //console.log("click ", e);
    };
    const onSelect = (item) => {
      setFolderName(item.key);
      console.log("select ", item.key);
    };
    return (
      <div>
        <Divider orientation="left" orientationMargin="0">
          Folders
        </Divider>
        <Menu
          onClick={onClick}
          style={{
            width: 256
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          onSelect={onSelect}
        />
      </div>
    );
  };
  return <Vert />;
}
