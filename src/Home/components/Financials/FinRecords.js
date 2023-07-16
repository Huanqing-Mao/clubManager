import { Button, Input, Divider, Empty } from "antd";
import FinForm from "./FinForm";
import { useState } from "react";
import FinList from "./Finlist";
const { Search } = Input;

export default function FinRecords({ userID, manager, ccaID }) {
  const [recordPage, setRecordPage] = useState("");
  const [year, setYear] = useState("");
  const onClick = () => {
    setRecordPage("form");
  };

  const onSearch = () => {};
  const handleKeywordChange = () => {};

  return (
    <div>
      <p></p>
      {recordPage === "form" ? (
        <FinForm
          setRecordPage={setRecordPage}
          userID={userID}
          manager={manager}
          ccaID={ccaID}
        />
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
          <FinList userID={userID} manager={manager} ccaID={ccaID} />
        </div>
      )}
    </div>
  );
}
