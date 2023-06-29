import FinMenu from "./FinMenu";
import { useState } from "react";
import FinRecords from "./FinRecords";
import FinVis from "./FinVis";

export default function FinMain() {
  const [page, setPage] = useState("records");
  return (
    <div className="FinMain">
      <h1>Financials</h1>
      <FinMenu setPage={setPage} />
      {page === "records" ? <FinRecords /> : <FinVis />}
    </div>
  );
}
