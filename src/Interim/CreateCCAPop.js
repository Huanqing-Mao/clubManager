import { Button, Popover } from "antd";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreateCCA from "./CreateCCA";

export default function CreateCCAPop( { userID } ) {
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
          <CreateCCA userID={userID} />
          <a onClick={hide}>Close</a>
        </div>
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button icon={<PlusCircleOutlined />}>
        Create CCA
      </Button>
    </Popover>
  );
}
