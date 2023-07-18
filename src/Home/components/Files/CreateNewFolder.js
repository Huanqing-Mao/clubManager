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

export default function CreateNewFolder({ nameList, hide, ccaName }) {
  const [fileName, setFileName] = useState("");

  const handleFilenameInputChange = (event) => {
    setFileName(event.target.value);
  };

  const handleUpload = async () => {
    if (fileName) {
      const path = ccaName + fileName;
      if (nameList.includes(path)) {
        console.log(nameList);
        message.error("Name already exists!");
      } else {
        const { data, error } = await supabase.storage
          .from("cca")
          .upload(`${path}/ignore`, ignore);

        if (error) {
          console.error("Error uploading file:", error);
          //alert("Error! You might have uploaded the same file twice!");
        } else {
          console.log("Folder Created successfully");
          message.success("Success!");
          hide();
        }

        setFileName("");
      }
    } else {
      message.error("Folder Name cannot be empty!");
    }
  };

  return (
    <div>
      <Input
        className="new-folder-box"
        placeholder="Folder Name"
        maxLength="20"
        onChange={handleFilenameInputChange}
        value={fileName}
        style={{
          width: "100%"
        }}
      />
      <p></p>
      <Button type="default" onClick={handleUpload}>
        Create
      </Button>
      <p></p>
    </div>
  );
}
