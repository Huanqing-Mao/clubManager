import { Button, Input, Divider, Empty } from "antd";
import FinForm from "./FinForm";
import { useState } from "react";
const { Search } = Input;

export default function FinRecords() {
  const [recordPage, setRecordPage] = useState("");
  const [year, setYear] = useState("");
  const onClick = () => {
    setRecordPage("form");
  };

  const onSearch = () => {};
  const handleKeywordChange = () => {};

  return (
    <div>
      <h2>Records</h2>

      {recordPage === "form" ? (
        <FinForm setRecordPage={setRecordPage} />
      ) : (
        <div>
          <Button type="primary" onClick={onClick}>
            Create New Record
          </Button>
          <Divider type="vertical" />

          <Search
            placeholder="Search Year"
            onSearch={onSearch}
            onChange={handleKeywordChange}
            value={year}
            allowClear
            style={{
              width: 200
            }}
          />
          <p></p>
          <div style={{ marginTop: "100px" }}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60
              }}
              description={<span>No records yet, create a new one!</span>}
            ></Empty>
          </div>
        </div>
      )}
    </div>
  );
}
