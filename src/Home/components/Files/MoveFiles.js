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
      // Copy the file to the destination folder
      if (toFolder) {
        await supabase.storage
          .from("cca")
          .move(`${folderName}/${fileName}`, `${toFolder}/${fileName}`);
        console.log(folderName, fileName);
        console.log(toFolder, fileName);

        message.success("File moved successfully");
        // Handle the success case
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
