import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "antd";

function PollResult({ pollID, currentID }) {
    const [options, setOptions] = useState([]);
    const [number, setNumber] = useState(null);
    const [records, setRecords] = useState([]);
    const [total, setTotal] = useState(0);

    async function fetchData() {
        let { data: ops, error } = await supabase
          .from("Options")
          .select("*")
          .eq("poll_id", pollID);
        //setOptions(ops);
        //console.log("poll options");
        //console.log(options);
        return ops;
    }

    async function getResults(optionID) {
        let { data: rs, error } = await supabase
        .from("Votes")
        .select("*", {count: 'exact'})
        .match({ option_id: optionID});
        console.log("current option: ", optionID);
        console.log("vote results: ",rs.length);
        //console.log("vote records:", records);
        setTotal((total) => total + rs.length)
        return rs.length;
    }

    const refreshData = () => {
        fetchData().then((value) => setOptions(value));
    }

    useEffect(() => {
        if (pollID !== null) {
            fetchData().then((value) => setOptions(value));
            console.log("vote options:", options);
        }     
    }, [pollID]);

    useEffect(() => {
        setRecords([]);
        setTotal(0);
        if (pollID !== null) {
            Promise.all(options.map((item) => (
                getResults(item.id).then((value) => ({
                    name: item.text,
                    value: value
                }))
            ))).then((results) => {
                setRecords(results);
                console.log("vote records:", results);
            });
        }
    }, [pollID, options]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${label} : ${payload[0].value}`}</p>
              <p>{`${(payload[0].value/total).toFixed(4)*100} %`}</p>
            </div>
          );
        }
      
        return null;
      };

    if (pollID === null) {
        return(
            <div></div>
        )
    }

    return (
        <div className="poll_result">
            <h2>Poll result:</h2>
            <Button onClick={refreshData}>refresh</Button>
            <ResponsiveContainer width="100%" height={60 * records.length} >
                <BarChart
                width={600}
                height={400}
                data={records}
                layout="vertical"
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="value" type="number"/>
                <YAxis 
                yAxisId={0}
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}/>
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" barSize={20} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PollResult;