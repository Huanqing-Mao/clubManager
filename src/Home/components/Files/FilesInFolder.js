import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import {
  FileTextOutlined,
  CloudDownloadOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { Divider, List, Button, Skeleton } from "antd";
import UploadPop from "./UploadPop";
import DeleteFolders from "./DeleteFolder";
import MovePop from "./MovePop";

export default function FilesInFolder({
  folderName,
  listFolders,
  setFolderName
}) {
  const [fileList, setFileList] = useState([]);

  async function fetchFiles() {
    try {
      const { data, error } = await supabase.storage
        .from("cca")
        .list(folderName);
      if (error) {
        console.error("Error listing files:", error.message);
        return;
      }

      setFileList(data);
    } catch (error) {
      console.error("Error listing files:", error.message);
    }
  }

  async function downloadFile(item) {
    try {
      const { data, error } = await supabase.storage
        .from("cca")
        .download(`${folderName}/${item}`);
      console.log("success!");

      alert("Start Downloading...");
      const blob = new Blob([data], { type: data.type });

      // Generate a URL for the Blob
      const downloadURL = URL.createObjectURL(blob);

      // Use the URL to initiate the file download
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadURL;
      downloadLink.download = item; // Specify the desired file name
      downloadLink.click();

      // Clean up the created URL after the download is complete
      URL.revokeObjectURL(downloadURL);
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }
  }

  // delete files
  async function deleteFile(item) {
    try {
      const { error } = await supabase.storage
        .from("cca")
        .remove([`${folderName}/${item}`]);

      if (error) {
        console.error("Error deleting file:", error.message);
        return;
      }

      console.log("File deleted successfully");
      alert("Deleted!");
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  }

  useEffect(() => {
    fetchFiles();
  }, [folderName]);
  const data = fileList
    .filter((item) => item.name !== ".emptyFolderPlaceholder")
    .filter((item) => item.name !== "ignore");

  console.log(data.map((item) => item.name));
  console.log(data.filter((item) => item.name !== "ignore"));
  return (
    <div>
      <Divider orientation="left" orientationMargin="0">
        Files
      </Divider>

      {fileList.length > 0 ? (
        <>
          <h2
            style={{
              fontFamily: "BlinkMacSystemFont, Roboto, sans-serif"
            }}
          >
            {folderName.includes("folder-")
              ? folderName.replace("folder-", "")
              : folderName}
          </h2>

          <UploadPop folderName={folderName} fetchFiles={fetchFiles} />
          <p></p>

          <List
            bordered
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    icon=<CloudDownloadOutlined />
                    onClick={() => downloadFile(item.name)}
                  >
                    Download
                  </Button>,
                  <Button
                    icon=<DeleteOutlined />
                    onClick={() => deleteFile(item.name)}
                  >
                    Delete
                  </Button>,
                  <MovePop
                    folderName={folderName}
                    fileName={item.name}
                    fetchFiles={fetchFiles}
                  />
                ]}
              >
                <div>
                  <FileTextOutlined /> {item.name}
                </div>
              </List.Item>
            )}
          />
          <p></p>

          <DeleteFolders
            folderName={folderName}
            listFolders={listFolders}
            setFolderName={setFolderName}
          />
        </>
      ) : (
        <div>
          <h2
            style={{
              fontFamily: "BlinkMacSystemFont, Roboto, sans-serif"
            }}
          >
            {folderName.includes("folder-")
              ? folderName.replace("folder-", "")
              : folderName}
          </h2>
          <List bordered itemLayout="vertical" dataSource={[]} />
        </div>
      )}
    </div>
  );
}