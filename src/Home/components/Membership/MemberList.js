import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import { message, Table, Space, Spin, Button } from "antd";

export default function MemberList({ userID, manager, ccaID }) {
  const [load, setLoad] = useState(true);
  const [memberList, setMemberList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const ccaid = ccaID;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Role",
      dataIndex: "manager",
      key: "manager"
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.manager === "Manager" ? (
            <a onClick={() => setMember(record.user_id, ccaid)}>
              Set as Member
            </a>
          ) : (
            <a onClick={() => setManager(record.user_id, ccaid)}>
              Set as Manager
            </a>
          )}
        </Space>
      )
    }
  ];

  async function setManager(userid, ccaid) {
    const { data, error } = await supabase
      .from("Records")
      .update({ manager: true })
      .eq("user_id", userid)
      .eq("cca_id", ccaid)
      .select();

    if (error) {
      console.error("Error fetching username:", error);
      message.error("Error Setting Manager!");
    } else {
      message.success("Success!");
    }
  }

  async function setMember(userid, ccaid) {
    const { data, error } = await supabase
      .from("Records")
      .update({ manager: false })
      .eq("user_id", userid)
      .eq("cca_id", ccaid)
      .select();

    if (error) {
      console.error("Error fetching username:", error);
      message.error("Error Setting Member!");
    } else {
      console.log("success!");
      message.success("Success!");
    }
  }

  async function fetchMembers(ccaid) {
    try {
      const { data: Records, error } = await supabase
        .from("Records")
        .select("user_id, manager, users(user_id, name)")
        .eq("cca_id", ccaid);

      if (error) {
        console.error("Error fetching username:", error);
        message.error("Error Fetching Member Data!");
      } else {
        const list = Records.map((item) => ({
          name: item.users.name,
          manager: item.manager ? "Manager" : "Member",
          user_id: item.user_id
        })).sort((a, b) => {
          const nameA = a.name.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1; // Name A comes before Name B
          }
          if (nameA > nameB) {
            return 1; // Name A comes after Name B
          }
          return 0; // Names are equal
        });
        //console.log("display list: ", list);
        //console.log(Records);
        setMemberList(Records);
        setDisplayList(list);
        setLoad(false);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      message.error("Error Fetching Member Data!");
    }
  }

  useEffect(() => {
    fetchMembers(ccaid);
  }, [memberList.map((item) => item.manager)]);

  return (
    <div>
      <h2>Members: </h2>
      {load ? (
        <div style={{ marginTop: "100px" }}>
          <Spin tip="Loading Member Data..." size="large">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <div>
          {/*<Button type="primary" disabled={true}>
            Visualise Profile
          </Button> */}
          <p></p>
          <Table
            dataSource={displayList}
            columns={columns}
            pagination={false}
          />
        </div>
      )}
    </div>
  );
}
