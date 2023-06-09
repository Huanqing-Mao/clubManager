import { useState } from "react";
import { supabase } from "../../../supabase";
import { Space, Input } from "antd";
import {
  UploadOutlined,
  FolderAddOutlined,
  CaretLeftOutlined
} from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import DragToUpload from "./DragToUpload";
import SelectFolder from "./SelectFolder";
import RadioOptions from "./RadioOptions";
import { Card } from "antd";
import ignore from "./ignore";

export default function CreateNewFolder() {
  const [fileName, setFileName] = useState("");

  const handleFilenameInputChange = (event) => {
    setFileName(event.target.value);
  };

  const handleUpload = async () => {
    const path = "folder-" + fileName;
    const { data, error } = await supabase.storage
      .from("cca")
      .upload(`${path}/ignore`, ignore);

    if (error) {
      console.error("Error uploading file:", error);
      //alert("Error! You might have uploaded the same file twice!");
    } else {
      console.log("Folder Created successfully");
      alert("Success!");
    }

    setFileName("");
  };

  return (
    <div>
      <Input
        className="new-folder-box"
        placeholder="Folder Name"
        maxLength="20"
        onChange={handleFilenameInputChange}
        value={fileName}
      />
      <Button type="default" onClick={handleUpload}>
        Create
      </Button>
    </div>
  );
}
