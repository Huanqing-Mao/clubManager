import {
  Button,
  Spin,
  Empty,
  Divider,
  Tag,
  Table,
  message,
  Card,
  Popconfirm
} from "antd";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import { DeleteOutlined } from "@ant-design/icons";

export default function FinList( { userID, manager, ccaID } ) {
  const [finList, setFinList] = useState([]);
  //const [eventID, setEventID] = useState("");
  const columns = [
    {
      title: "Field",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <p>
          <strong>{text}</strong>
        </p>
      )
    },
    {
      title: "Group Fund",
      dataIndex: "gf",
      key: "gf"
    },
    {
      title: "NUS Operating Budget",
      dataIndex: "nob",
      key: "nob"
    },
    {
      title: "Other Grants",
      dataIndex: "og",
      key: "og"
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes"
    },
    {
      title: "Total Spent",
      dataIndex: "total",
      key: "total"
    }
  ];
  async function fetchList() {
    let { data: Financial_Event, error } = await supabase
      .from("Financial_Event")
      .select(`*, Tags(tag_id, tag_name)`)
      .eq("cca_id", ccaID);
    //console.log("Fin Events", Financial_Event);

    if (Financial_Event.length >= 1) {
      const sortedData = Financial_Event.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setFinList(sortedData);
    } else {
      console.log("empty list");
      setFinList(["empty"]);
    }
  }

  async function deleteRecord(event_id) {
    const { error } = await supabase
      .from("Financial_Event")
      .delete()
      .eq("event_id", event_id);

    if (error) {
      message.error("Error Deleting Record!");
    } else {
      fetchList();
      message.success("Success!");
    }
  }
  const cancel = (e) => {
    //console.log(e);
    message.error("Delete action cancelled");
  };

  useEffect(() => {
    fetchList();
    //console.log(finList);
  }, []);
  return (
    <div>
      {finList.length > 0 ? (
        finList[0] === "empty" ? (
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
            {" "}
            {finList.map((item) => {
              const dataSource = [
                item.creatives,
                item.prod_cost,
                item.additional_equip,
                item.props,
                item.photo_vid,
                item.logistics,
                item.welfare
              ];
              const names = [
                "Creatives",
                "Production Cost(Manpower/Venue)",
                "Production Cost(Additional Equipment",
                "Props/Set/Costume",
                "Photography/Videography",
                "Logistics",
                "Welfare"
              ];
              const dataSourceWithNames = dataSource.map((obj, index) => ({
                ...obj,
                name: names[index]
              }));
              //console.log(dataSourceWithNames);
              const dateTime = new Date(item.created_at).toLocaleString(
                "en-GB",
                {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric"
                }
              );

              return (
                <div style={{ whiteSpace: "pre-line" }}>
                  <Card
                    headStyle={{ background: "rgba(7, 133, 165, 0.1)" }}
                    title={item.event_name}
                    extra={
                      <a style={{ color: "black" }}>
                        Tag: <Tag color="geekblue">{item.Tags.tag_name}</Tag>
                      </a>
                    }
                  >
                    <div>
                      <p>
                        {" "}
                        <strong>Created at:</strong> {dateTime}
                      </p>
                      <p>
                        <strong>Event Time</strong>: {item.acad_year} / Semester{" "}
                        {item.semester}
                      </p>

                      <p>
                        <strong>Total Expense</strong>: SGD $ {item.total_cost}
                      </p>
                      <Divider />

                      <h3>Cost Details</h3>

                      <Table
                        dataSource={dataSourceWithNames}
                        columns={columns}
                        pagination={false}
                      />
                    </div>
                    <p></p>

                    <Popconfirm
                      title="Delete Financial Record"
                      description="Are you sure to delete this record?"
                      onConfirm={() => deleteRecord(item.event_id)}
                      onCancel={cancel}
                      okText="Delete"
                      cancelText="Cancel"
                    >
                      <Button danger icon=<DeleteOutlined />>
                        Delete
                      </Button>
                    </Popconfirm>
                  </Card>
                  <p></p>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div style={{ marginTop: "100px" }}>
          <Spin tip="Loading Records..." size="large">
            <div className="content" />
          </Spin>
        </div>
      )}
    </div>
  );
}
