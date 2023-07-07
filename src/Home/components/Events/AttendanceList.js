import { supabase } from "../../../supabase";
import { useState, useEffect } from 'react';
import { Divider, Table, Button } from "antd";
import { RedoOutlined } from '@ant-design/icons';

function AttendanceList({ eventID }) {
    const [IDList, setIDList] = useState(null);
    const [nameList, setNameList] = useState(null);
    const [key, setKey] = useState(0);

    async function getAttendanceList() {
        const { data: at, aerror } = await supabase
        .from("Attendance")
        .select("member_id, users( name, year, faculty )")
        .match({
            event_id: eventID,
            attending: true
        });
        console.log("attending:", at)
        if (at !== null && at[0] !== undefined) {
            setIDList(at.map((item) => (
                {
                    name: item.users.name,
                    year: item.users.year,
                    faculty: item.users.faculty,
                    id: item.member_id
                }
              )));
        } else {
            setIDList([]);
        };
    }

    useEffect(() => {
        getAttendanceList();
        console.log("attendance:", IDList);
      }, [eventID, setKey]);
    

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Year',
          dataIndex: 'year',
          key: 'year',
        },
        {
          title: 'Faculty',
          dataIndex: 'faculty',
          key: 'faculty',
        },
    ]

    if (IDList === null) {
        return (
            <div>
                <h2>Attending:</h2>
                <h3>Loading...</h3>
            </div>
        );
    } else {
        return (
            <div key={key}>
                <Divider orientation="left">Attending</Divider>
                <p>Total: {IDList.length}</p>
                <Button onClick={getAttendanceList}>Refresh</Button>
                <br></br>
                <br></br>
                <Table dataSource={IDList} columns={columns} />
            </div>
        );
    }
    
}

export default AttendanceList;