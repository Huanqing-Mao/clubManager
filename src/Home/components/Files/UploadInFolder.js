import { useState } from "react";
import { supabase } from "../../../supabase";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Spin } from "antd";

import { Card } from "antd";

export default function UploadInFolder({ folderName }) {
  const [uploadStatus, setUploadStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploadStatus(true);
      const path = folderName;
      console.log(path);
      const { data, error } = await supabase.storage
        .from("cca")
        .upload(`${path}/${selectedFile.name}`, selectedFile);
      setUploadStatus(false);

      if (error) {
        if (error.error === "Duplicate") {
          message.error("The file already exists!");
        } else {
          message.error("Unexpected Error uploading file");
          console.log(error.error);
        }
      } else {
        console.log("File uploaded successfully");
        message.success("Upload Success!");
      }
    } else {
      message.error("No file chosen!");
    }

    setSelectedFile(null);
  };

  const DragUpload = () => {
    return (
      <div>
        <br />
        <Button icon={<UploadOutlined />} onClick={handleUpload} size="small">
          Upload
        </Button>
      </div>
    );
  };

  return (
    <div>
      {uploadStatus ? (
        <div>
          <Spin tip="Upload in Progress...">
            <Card title="" size="small">
              <input type="file" onChange={handleFileChange} />
              <DragUpload />
            </Card>{" "}
          </Spin>
        </div>
      ) : (
        <Card title="" size="small">
          <input type="file" onChange={handleFileChange} />
          <DragUpload />
        </Card>
      )}

      <br />
    </div>
  );
}
