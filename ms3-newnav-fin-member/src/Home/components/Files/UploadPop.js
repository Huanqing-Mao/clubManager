import { Button, Popover } from "antd";
import { useState } from "react";
import UploadInFolder from "./UploadInFolder";
import { CloudUploadOutlined } from "@ant-design/icons";

export default function UploadPop({ folderName, fetchFiles }) {
  const Pop = () => {
    const [open, setOpen] = useState(false);
    const hide = () => {
      setOpen(false);
      fetchFiles();
    };
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };
    return (
      <Popover
        content={
          <div>
            <UploadInFolder folderName={folderName} hide={hide} />
            <a onClick={hide}>Close</a>
          </div>
        }
        title="Upload New File"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button type="primary" icon=<CloudUploadOutlined />>
          Upload File
        </Button>
      </Popover>
    );
  };

  return <Pop />;
}
