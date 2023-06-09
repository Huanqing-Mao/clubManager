import { Select, Space, Button } from "antd";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";

export default function SelectFolder({
  defaultValue,
  setDefault,
  toFolder,
  setFolder
}) {
  const [folderList, setFolderList] = useState([]);

  const handleChange = (value) => {
    setDefault(value);
    console.log(`selected ${value}`);
  };

  const handleSelect = (value) => {
    setFolder(value);
    console.log("set to", value);
  };

  // access list of folders in cca
  async function listFolders() {
    try {
      const { data, error } = await supabase.storage.from("cca").list("");
      if (error) {
        console.error("Error listing folders:", error.message);
        return;
      }

      const folders = data
        .filter((item) => item.name.includes("folder"))
        .map((item) => item.name);
      setFolderList(folders);
      console.log("Folders:", folders);
    } catch (error) {
      console.error("Error listing folders:", error.message);
    }
  }
  useEffect(() => {
    listFolders();
  }, []);

  const SelectFolderList = () => (
    <Space wrap>
      <Select
        defaultValue={defaultValue}
        style={{
          width: 175,
          marginBottom: 0
        }}
        onChange={handleChange}
        options={folderList.map((item) => ({ value: item, label: item }))}
        onSelect={handleSelect}
      />
    </Space>
  );

  return (
    <div>
      <SelectFolderList />
    </div>
  );
}
