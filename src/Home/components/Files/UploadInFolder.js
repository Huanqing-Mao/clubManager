import { useState } from "react";
import { supabase } from "../../../supabase";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { Card } from "antd";

export default function UploadInFolder({ folderName }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const path = folderName;
      console.log(path);
      const { data, error } = await supabase.storage
        .from("cca")
        .upload(`${path}/${selectedFile.name}`, selectedFile);

      if (error) {
        console.error("Error uploading file:", error);
        //alert("Error! You might have uploaded the same file twice!");
      } else {
        console.log("File uploaded successfully");
        alert("Upload Success!");
      }
    } else {
      alert("No file chosen!");
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
      <Card title="" size="small">
        <input type="file" onChange={handleFileChange} />
        <DragUpload />
      </Card>
      <br />
    </div>
  );
}
