import { Button, Popover } from "antd";
import { useState } from "react";
import JoinCCA2 from "./JoinCCA";
import { UsergroupAddOutlined } from "@ant-design/icons";

export default function JoinCCAPop( { userID } ) {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={
        <div>
          <JoinCCA2 userID={userID} />
          <a onClick={hide}>Close</a>
        </div>
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="primary" icon={<UsergroupAddOutlined />}>
        Join CCA
      </Button>
    </Popover>
  );
}
