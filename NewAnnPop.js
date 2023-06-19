import { Button, Popover } from "antd";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreateNewAnn from "./CreateNewAnn";

export default function NewAnnPop({ userID, fetchAnnouncements }) {
  const Pop = () => {
    const [open, setOpen] = useState(false);
    const hide = () => {
      setOpen(false);
      fetchAnnouncements();
    };
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };
    return (
      <Popover
        content={
          <div>
            <CreateNewAnn userID={userID} hide={hide} />
            <p></p>
            <a onClick={hide}>Close</a>
          </div>
        }
        title="Create New Announcement"
        trigger="click"
        placement="bottomLeft"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button icon=<PlusCircleOutlined />>New Announcement</Button>
      </Popover>
    );
  };

  return <Pop />;
}
