import { Button, Popover } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import EditAnn from "./EditAnn";

export default function EditPop({
  content,
  title,
  annID,
  fetchAnnouncements,
  userID
}) {
  //console.log("id in here:", userID);
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
            <EditAnn
              content={content}
              title={title}
              annID={annID}
              hide={hide}
              userID={userID}
            />
            <p></p>
            <a onClick={hide}>Close</a>
          </div>
        }
        title="Update Announcement"
        trigger="click"
        placement="bottomLeft"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button icon=<EditOutlined />>Edit</Button>
      </Popover>
    );
  };

  return <Pop />;
}
