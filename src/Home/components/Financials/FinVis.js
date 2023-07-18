import PieChartByTag from "./PieChartByTag";
import LineCharts from "./LineCharts";
import { useState, useEffect } from "react";
import { Spin } from "antd";

/*<div style={{ marginTop: "100px" }}>
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div> */

export default function FinVis({ ccaID }) {
  const [finData, setFinData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [tagList, setTagList] = useState([]);

  return (
    <div>
      <div
        style={{
          opacity: "0.8",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        }}
      >
        <div>
          <LineCharts
            dataList={dataList}
            setDataList={setDataList}
            tagList={tagList}
            setTagList={setTagList}
            ccaID={ccaID}
          />

          <PieChartByTag
            finData={finData}
            setFinData={setFinData}
            yearData={yearData}
            setYearData={setYearData}
            ccaID={ccaID}
          />
        </div>
      </div>
    </div>
  );
}
