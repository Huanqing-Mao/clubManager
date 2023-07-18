import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Label } from "recharts";
import { Divider, Spin } from "antd";

export default function PieChartByTag({
  finData,
  setFinData,
  yearData,
  setYearData,
  ccaID
}) {
  //const [finData, setFinData] = useState([]);
  //const [yearData, setYearData] = useState([]);

  const RADIAN = Math.PI / 180;
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "darkgreen",
    "darkblue",
    "darkcyan"
  ];

  function filterByYear(list, year) {
    console.log("list: ", list);
    console.log("year:", year);
    const result = list.filter((item) => item.year === year);
    console.log(result);
    const aggregatedList = result.reduce((accumulator, item) => {
      const { cost, year, tag } = item;
      if (!accumulator[tag]) {
        accumulator[tag] = { year, cost, tag };
      } else {
        accumulator[tag].cost += cost;
      }
      return accumulator;
    }, {});
    console.log("agg list: ", aggregatedList);
    const aggregatedArray = Object.values(aggregatedList);

    console.log("Agg result:", aggregatedArray);
    return aggregatedArray;
  }

  async function fetchData() {
    const { data: Financial_Event, error } = await supabase
      .from("Financial_Event")
      .select(`total_cost,Tags(tag_id, tag_name), acad_year`)
      .eq("cca_id", ccaID);

    const { data: years, errorYear } = await supabase
      .from("Financial_Event")
      .select("acad_year")
      .eq("cca_id", ccaID);

    if (error) {
      console.log(error);
    } else if (Financial_Event.length >= 1) {
      //console.log(Financial_Event);
      let yearList = [];

      if (years) {
        yearList = years.map((item) => {
          return item.acad_year;
        });
      }

      const uniqueYears = [...new Set(yearList)];
      console.log("unique years:", uniqueYears);
      setYearData(uniqueYears);
      const data = Financial_Event.map((item) => {
        return {
          tag: item.Tags.tag_name,
          cost: item.total_cost,
          year: item.acad_year
        };
      });

      setFinData(data);

      console.log("unprocessed data", data);
      //console.log("result:", resultList);
    } else {
      //console.log("empty list");
    }
  }

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="gray"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${name} : ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    fetchData();
    //setLoading(false);
    //console.log("finData:", finData);
  }, [finData.length]);

  return (
    <div>
      <div className="PieChart">
        {finData.length >= 1 ? (
          <div>
            <Divider
              orientation="left"
              orientationMargin="0"
              style={{ fontSize: "25px", color: "black" }}
            >
              Percentage of Expense By Tag Each Year
            </Divider>
            {yearData.map((item) => {
              const dataForChart = filterByYear(finData, item);
              return (
                <div style={{ marginBottom: "-199px" }}>
                  <Divider
                    orientation="left"
                    orientationMargin="0"
                    style={{ fontSize: "15px" }}
                  >
                    Year {dataForChart[0].year}
                  </Divider>

                  <PieChart width={900} height={600}>
                    <Pie
                      data={dataForChart}
                      dataKey="cost"
                      nameKey="tag"
                      cx={250}
                      cy={200}
                      outerRadius={90}
                      label={renderCustomizedLabel}
                      animationEasing="ease-out"
                    >
                      {finData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
