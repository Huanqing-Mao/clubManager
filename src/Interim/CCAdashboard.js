import "../styles.css";
import {
  Card,
  Button,
  Empty,
  Col,
  Row,
  Spin,
  Divider,
  Space,
  message
} from "antd";
import { LoginOutlined } from "@ant-design/icons";
import JoinCCAPop from "./JoinCCAPop";
import CreateCCAPop from "./CreateCCAPop";
import cblogo from "../cb_logo.png";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabase";

export default function CCAdashboard({
  userID,
  setChoice,
  setManager,
  choice,
  manager,
  showLogOut
}) {
  //const listOfCCAs = ["Chinese Dance", "Piano Ensemble", "Test CCA"];
  //const goToCCA = () => {};
  const [joined, setJoined] = useState(null);
  const [CCAs, setCCAs] = useState(null);
  console.log("In CCA dashboard");
  const handleSignOut = async () => {
    console.log(userID);
    try {
      await supabase.auth.signOut();
      console.log("Success signing out!");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  async function getCCA(userID) {
    try {
      const { data, error } = await supabase
        .from("Records")
        .select(
          `
        cca_id,
        user_id,
        manager,
        CCA ( cca_name )
        `
        )
        .eq("user_id", userID);

      if (error) {
        console.error("Error fetching username:", error);
        return false;
      } else {
        if (data && data.length > 0) {
          setCCAs(data);
          return true;
        } else {
          setCCAs([]);
          return false;
        }
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      return false;
    }
  }

  useEffect(() => {
    //formStatus();
    getCCA(userID).then((value) => setJoined(value));
    console.log("CCAs:", CCAs);
  }, [userID, joined]);

  const chooseCCA = useCallback(
    (ccaID, manager) => {
      setChoice(ccaID);
      console.log("choosing CCA:", ccaID);
      message.success("Success!");
      setManager(manager);
      console.log("manager: ", manager);
    },
    [choice]
  );

  if (joined === null) {
    return (
      <div>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  return (
    <div className="CCAdashboard">
      <div className="CCAbuttons">
        <JoinCCAPop userID={userID} />
        <Divider type="vertical" />
        <CreateCCAPop userID={userID} />
        <Divider type="vertical" />
        {showLogOut ? (
          <Button icon=<LoginOutlined /> onClick={handleSignOut}>
            Log Out
          </Button>
        ) : (
          <></>
        )}
      </div>
      <p></p>
      <br></br>
      <div style={{ marginLeft: "7%" }}>
        {CCAs.length > 0 ? (
          <Row gutter={16}>
            {CCAs.map((item) => {
              return (
                <div>
                  <Col span={8}>
                    <div className="CCAcard">
                      <Card
                        style={{ width: 220 }}
                        onClick={() => chooseCCA(item.cca_id, item.manager)}
                        hoverable={true}
                        cover={<img alt="cca avatar" src={cblogo} />}
                      >
                        <strong>{item.CCA.cca_name}</strong>
                        {item.manager ? <p>Manager</p> : <p>Member</p>}
                      </Card>
                    </div>
                  </Col>
                  <p></p>
                </div>
              );
            })}
          </Row>
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60
            }}
            description={<span>No CCAs yet, Join one via CCA-code!</span>}
          ></Empty>
        )}
      </div>
    </div>
  );
}
