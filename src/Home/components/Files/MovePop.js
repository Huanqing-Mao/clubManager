import { Button, Popover } from "antd";
import { useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import MoveFiles from "./MoveFiles";

export default function MovePop({ folderName, fileName, fetchFiles }) {
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
            <MoveFiles folderName={folderName} fileName={fileName} />
            <p> </p>
            <a onClick={hide}>Close</a>
          </div>
        }
        title="Upload New File"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button type="default" icon=<ArrowRightOutlined />>
          Move
        </Button>
      </Popover>
    );
  };

  return <Pop />;
}
