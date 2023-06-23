import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import {
  Button,
  Spin,
  Card,
  message,
  Popconfirm,
  Divider,
  Input,
  Pagination
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import EditPop from "./EditPop";
import NewAnnPop from "./NewAnnPop";

const { Search } = Input;

export default function AnnList({ userID }) {
  const [annList, setAnnList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filterWord, setFilterWord] = useState("");
  const [username, setUsername] = useState("");
  console.log("ID HERE", userID);

  const cancel = (e) => {
    //console.log(e);
    message.error("Delete action cancelled");
  };

  async function fetchAnnouncements() {
    try {
      // Fetch the list of announcements from the "announcements" table
      const { data, error } = await supabase.from("Announcements").select(
        `ann_id, user_id,title,
          content,
          created_at,
          users(user_id, name)`
      );
      //console.log("data: ", data);
      //console.log(data.length === 0);

      if (error) {
        console.error("Error fetching announcements:", error.message);
      } else if (data.length === 0) {
        setAnnList(["empty"]);
      } else {
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setAnnList(sortedData);
        console.log("annlist", annList);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error.message);
    }
  }

  async function getProfile(userID) {
    try {
      console.log(userID);
      const { data, error } = await supabase
        .from("users")
        .select("name")
        .eq("user_id", userID)
        .single();
      console.log(data);

      if (error) {
        console.error("Error fetching username:", error);
        return "";
      }

      console.log(data.name);

      return data.name;
    } catch (error) {
      console.error("Error fetching username:", error);
      return "";
    }
  }
  useEffect(() => {
    fetchAnnouncements();
    getProfile(userID).then((value) => setUsername(value));
    console.log(username);
  }, [annList.length]);

  async function deleteRow(user_id, created_at, username) {
    try {
      console.log(username);
      if (!username || username === null) {
        message.error("No access.");
      } else {
        const { data, error } = await supabase
          .from("Announcements")
          .delete()
          .eq("user_id", user_id)
          .eq("created_at", created_at);

        if (error) {
          console.error("Error deleting row:", error.message);
          message.error("ERROR!!!");
        } else {
          console.log("Row deleted successfully");
          fetchAnnouncements();

          // Perform any additional actions or update the UI as needed
        }
      }
    } catch (error) {
      console.error("Error deleting row:", error.message);
    }
  }

  const onSearch = (value) => {
    //console.log("value:", value);
    setFilterWord(value);
    //console.log("filterword", filterWord);
  };
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  function filterContent(item, word) {
    return (
      item.content.toLowerCase().includes(word.toLowerCase()) ||
      item.title.toLowerCase().includes(word.toLowerCase())
    );
  }

  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return (
    <div>
      <p></p>

      <NewAnnPop userID={userID} fetchAnnouncements={fetchAnnouncements} />
      <Divider type="vertical" />
      <Search
        placeholder="Search Announcement"
        onSearch={onSearch}
        onChange={handleKeywordChange}
        value={keyword}
        allowClear
        style={{
          width: 350
        }}
      />

      {annList.length > 0 ? (
        annList[0] === "empty" ? (
          <div>
            <p></p>
            <Card> There are no announcements yet</Card>
          </div>
        ) : filterWord ? (
          annList
            .filter((item) => filterContent(item, filterWord))
            .map((item) => {
              //console.log(item);
              const dateObj = new Date(item.created_at);

              const options = {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
              };
              const formattedDate = dateObj.toLocaleDateString(
                "en-GB",
                options
              );
              //console.log(formattedDate);
              return (
                <div style={{ whiteSpace: "pre-line" }}>
                  <p></p>

                  <Card title={item.title}>
                    <p> {item.content}</p>
                    <p
                      style={{
                        fontSize: "80%",
                        fontStyle: "italic",
                        opacity: 0.5
                      }}
                    >
                      Created by: {item.users.name}
                    </p>
                    <p
                      style={{
                        fontSize: "80%",
                        fontStyle: "italic",
                        opacity: 0.5
                      }}
                    >
                      Created at : {formattedDate}
                    </p>

                    <EditPop
                      content={item.content}
                      title={item.title}
                      annID={item.ann_id}
                      fetchAnnouncements={fetchAnnouncements}
                      userID={userID}
                    />
                    <Divider type="vertical" />

                    <Popconfirm
                      title="Delete the announcement"
                      description="Are you sure to delete this announcement?"
                      onConfirm={() =>
                        deleteRow(item.user_id, item.created_at, username)
                      }
                      onCancel={cancel}
                      okText="Delete"
                      cancelText="Cancel"
                    >
                      <Button danger icon=<DeleteOutlined />>
                        Delete
                      </Button>
                    </Popconfirm>
                  </Card>
                </div>
              );
            })
        ) : (
          <div>
            {annList.map((item) => {
              const dateObj = new Date(item.created_at);

              const options = {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
              };
              const formattedDate = dateObj.toLocaleDateString(
                "en-GB",
                options
              );
              // just need to slice according to page number
              return (
                <div style={{ whiteSpace: "pre-line" }}>
                  <p></p>

                  <Card title={item.title}>
                    <p> {item.content}</p>
                    <p
                      style={{
                        fontSize: "80%",
                        fontStyle: "italic",
                        opacity: 0.5
                      }}
                    >
                      Created by: {item.users.name}
                    </p>
                    <p
                      style={{
                        fontSize: "80%",
                        fontStyle: "italic",
                        opacity: 0.5
                      }}
                    >
                      Created at : {formattedDate}
                    </p>

                    <EditPop
                      content={item.content}
                      title={item.title}
                      annID={item.ann_id}
                      fetchAnnouncements={fetchAnnouncements}
                      userID={userID}
                    />
                    <Divider type="vertical" />

                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this announcement?"
                      onConfirm={() =>
                        deleteRow(item.user_id, item.created_at, username)
                      }
                      onCancel={cancel}
                      okText="Delete"
                      cancelText="Cancel"
                    >
                      <Button danger icon=<DeleteOutlined />>
                        Delete
                      </Button>
                    </Popconfirm>
                  </Card>
                </div>
              );
            })}
            <p></p>
            {/*<Pagination current={current} onChange={onChange} total={50} />*/}
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
