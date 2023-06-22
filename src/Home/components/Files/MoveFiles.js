import { useState } from "react";
import { Button, message } from "antd";
import { supabase } from "../../../supabase";
import SelectFolder from "./SelectFolder";
import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";

export default function MoveFiles({ folderName, fileName }) {
  const [toFolder, setToFolder] = useState("");
  const [defaultValue, setDefaultValue] = useState("Move To");
  const handleClick = async () => {
    try {
      if (toFolder) {
        const { data, error } = await supabase.storage
          .from("cca")
          .list(`${toFolder}`, {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
            search: `${fileName}`
          });

        if (data.length > 0) {
          message.error("File already exists in the destination folder!");
        } else {
          await supabase.storage
            .from("cca")
            .move(`${folderName}/${fileName}`, `${toFolder}/${fileName}`);

          message.success("File moved successfully");
          // Handle the success case
        }
      } else {
        message.error("No folder Chosen!");
      }
    } catch (error) {
      console.error("Error moving file:", error.message);
      // Handle the error appropriately
    }
    setToFolder("");
  };
  return (
    <>
      <SelectFolder
        defaultValue={defaultValue}
        setDefault={setDefaultValue}
        currentFolder={folderName}
        toFolder={toFolder}
        setFolder={setToFolder}
      />
      <p></p>
      <Button type="default" icon=<ArrowRightOutlined /> onClick={handleClick}>
        Confirm Move{" "}
      </Button>
    </>
  );
}
