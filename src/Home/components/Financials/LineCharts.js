import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from "recharts";
import { Divider, Spin, Empty } from "antd";

export default function LineCharts({
  dataList,
  setDataList,
  tagList,
  setTagList,
  ccaID
}) {
  function filterBy(data, tagID) {
    const result = data.filter((item) => item.tagID === tagID);

    const aggregatedList = result.reduce((result, item) => {
      const { cost, year, tag } = item;
      if (!result[year]) {
        result[year] = { year, cost, tag };
      } else {
        result[year].cost += cost;
      }
      return result;
    }, {});

    const aggregatedArray = Object.values(aggregatedList);

    //console.log("Agg:", aggregatedArray);
    return aggregatedArray;
  }
  async function fetchDataByYear() {
    const { data: Financial_Event, error } = await supabase
      .from("Financial_Event")
      .select(`total_cost,acad_year, Tags(tag_id, tag_name)`)
      .eq("cca_id", ccaID);

    const { data: tags, errorTags } = await supabase
      .from("Financial_Event")
      .select("tag_id")
      .eq("cca_id", ccaID);

    if (error) {
      console.log(error);
    } else if (Financial_Event.length >= 1) {
      let tagList = [];
      if (tags) {
        tagList = tags.map((item) => {
          return item.tag_id;
        });
      }

      const uniqueTags = [...new Set(tagList)];
      //console.log("unique tags:", uniqueTags);
      setTagList(uniqueTags);

      const data = Financial_Event.map((item) => {
        return {
          tag: item.Tags.tag_name,
          tagID: item.Tags.tag_id,
          cost: item.total_cost,
          year: item.acad_year
        };
      });

      console.log(
        "filter test:",
        filterBy(data, "65203633-6c29-4c29-b5f5-4fe8fe485267")
      );

      //console.log("processed data:", data);
      setDataList(data);
    } else {
      setTagList(["empty"]);
      //console.log("empty list");
    }
  }
  useEffect(() => {
    fetchDataByYear();
  }, []);

  return (
    <div>
      {tagList ? (
        tagList[0] === "empty" ? (
          <div style={{ marginTop: "100px" }}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60
              }}
              description={<span>No records yet, create a new one!</span>}
            ></Empty>
          </div>
        ) : (
          <div>
            <Divider
              orientation="left"
              orientationMargin="0"
              style={{ fontSize: "25px", color: "black" }}
            >
              Cost Over Time For Each Tag
            </Divider>
            {tagList.map((item) => {
              const listForChart = filterBy(dataList, item);
              //console.log("list for chart", listForChart);
              return (
                <div>
                  <Divider
                    orientation="left"
                    orientationMargin="0"
                    style={{ fontSize: "15px" }}
                  >
                    {listForChart[0].tag}
                  </Divider>

                  <LineChart
                    width={730}
                    height={250}
                    data={listForChart}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cost" stroke="purple" />
                  </LineChart>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div style={{ marginTop: "100px" }}>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      )}
    </div>
  );
}
