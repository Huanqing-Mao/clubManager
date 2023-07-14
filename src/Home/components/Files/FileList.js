import { Button, Divider } from "antd";
import { FolderOutlined, FolderAddOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import FilesInFolder from "./FilesInFolder";
import FilesMenu from "./FilesMenu";
import selectImage from "./select_folder.png";
import NewFolderPop from "./NewFolderPop";

export default function FileList() {
  const [folderList, setFolderList] = useState([]);
  const [folderName, setFolderName] = useState("");
  const ccaName = "folder-";

  // each one handle click: go to respective pages showing list of files
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

  function getItem(label, key, icon, type) {
    return {
      key,
      icon,
      label,
      type
    };
  }

  const items = folderList.map((item) =>
    // rename ? rename : item.includes(folder....)
    // setrename = "" when closing the popover

    getItem(
      item.includes(ccaName) ? item.replace(ccaName, "") : item,
      item,
      <FolderOutlined />,
      {
        type: "divider"
      }
    )
  );

  return (
    <div>
      <h2>CCA Resources:</h2>
      <NewFolderPop listFolders={listFolders} nameList={folderList} />

      <div className="files-list">
        <div className="files-menu">
          <FilesMenu items={items} setFolderName={setFolderName} />
        </div>

        <div className="files-in-folder">
          {folderName ? (
            <FilesInFolder
              folderName={folderName}
              listFolders={listFolders}
              setFolderName={setFolderName}
            />
          ) : (
            <div>
              <Divider orientation="left" orientationMargin="0">
                Folders
              </Divider>

              <div className="select-folder">
                <img
                  src={selectImage}
                  alt="transparent Logo"
                  style={{
                    height: "100px"
                  }}
                />
                <h1>Select A Folder</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
