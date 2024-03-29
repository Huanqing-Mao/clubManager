import { Button, Divider } from "antd";
import { FolderOutlined, FolderAddOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import FilesInFolder from "./FilesInFolder";
import FilesMenu from "./FilesMenu";
import selectImage from "./select_folder.png";
import NewFolderPop from "./NewFolderPop";

export default function FileList({ userID, ccaID, manager }) {
  const [folderList, setFolderList] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [ccaName, setCCAName] = useState("impossible");

  // each one handle click: go to respective pages showing list of files
  async function getCCAName() {
    const { data: CCA, errorCCA } = await supabase
      .from("CCA")
      .select("*")
      .eq("cca_id", ccaID)
      .single();

    if (errorCCA) {
      console.error("Error getting cca name:", errorCCA.message);
      return;
    }
    console.log("cca name:", CCA.cca_name);
    setCCAName(CCA.cca_name + "-");
  }

  async function listFolders() {
    try {
      const { data, error } = await supabase.storage.from("cca").list("");
      if (error) {
        console.error("Error listing folders:", error.message);
        return;
      }

      const folders = data
        .filter((item) => item.name.includes(ccaName))
        .map((item) => item.name);
      setFolderList(folders);
    } catch (error) {
      console.error("Error listing folders:", error.message);
    }
  }

  useEffect(() => {
    getCCAName();
  }, []);

  /*useEffect(() => {
    listFolders();
    console.log("Folders:", folderList);
  }, [ccaName]);*/
  useEffect(() => {
    // Use async/await to ensure listFolders completes before logging
    const fetchFolders = async () => {
      await listFolders();
      console.log("Folders:", folderList);
    };

    fetchFolders();
  }, [ccaName]);

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
      {manager === true ? (
        <NewFolderPop
          listFolders={listFolders}
          nameList={folderList}
          ccaName={ccaName}
        />
      ) : (
        <></>
      )}

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
              manager={manager}
              ccaName={ccaName}
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
