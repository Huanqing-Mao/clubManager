import FinMenu from "./FinMenu";
import { useState } from "react";
import FinRecords from "./FinRecords";
import FinVis from "./FinVis";

export default function FinMain({ userID, manager, ccaID }) {
  const [page, setPage] = useState("records");
  return (
    <div className="FinMain">
      <FinMenu setPage={setPage} />
      {page === "records" ? (
        <FinRecords userID={userID} manager={manager} ccaID={ccaID} />
      ) : (
        <FinVis ccaID={ccaID} />
      )}
    </div>
  );
}
