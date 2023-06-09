import { Button, Popover } from "antd";
import { useState } from "react";
import { FolderAddOutlined } from "@ant-design/icons";
import CreateNewFolder from "./CreateNewFolder";

export default function NewFolderPop({ listFolders }) {
  const Pop = () => {
    const [open, setOpen] = useState(false);
    const hide = () => {
      setOpen(false);
      listFolders();
    };
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };
    return (
      <Popover
        content={
          <div>
            <CreateNewFolder />
            <a onClick={hide}>Close</a>
          </div>
        }
        title="Upload New File"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button type="primary" icon=<FolderAddOutlined />>
          New Folder
        </Button>
      </Popover>
    );
  };

  return <Pop />;
}
