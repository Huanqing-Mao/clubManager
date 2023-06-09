import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useState } from "react";
import { supabase } from "../../../supabase";

//export default App;

export default function DragToUpload({
  folder,
  setFolder,
  setFileName,
  setDefault
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log(folder);
      const { data, error } = await supabase.storage
        .from("cca")
        .upload(`${folder}/${selectedFile.name}`, selectedFile);

      if (error) {
        console.error("Error uploading file:", error);
        //alert("Error! You might have uploaded the same file twice!");
      } else {
        console.log("File uploaded successfully");
        alert("Upload Success!");
      }
    }
    setFileName("");
    setFolder("");
    setDefault("Select Folder");
    setSelectedFile(null);
  };

  const DragUpload = () => {
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <input type="file" onChange={handleFileChange} />

        <Button icon={<UploadOutlined />} onClick={handleUpload} size="large">
          Upload
        </Button>
      </div>
    );
  };

  return (
    <div>
      <DragUpload />
    </div>
  );
}
