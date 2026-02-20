import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import FetchName from "./FetchName";
import CompleteProfile from "./CompleteProfile";
import UpdateProfile from "./UpdateProfile";
import DisplayProfile from "./DisplayProfile";
import CompletedProfile from "./CompletedProfile";
import { Spin } from "antd";

async function fetchUsernameById(userId) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("name")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching username:", error);
      return null;
    }

    return data.name;
  } catch (error) {
    console.error("Error fetching username:", error);
    return null;
  }
}

export default function Profile({ userID }) {
  const [name, setName] = useState("User");

  useEffect(() => {
    const getUsername = async () => {
      const username = await fetchUsernameById(userID);
      if (username) {
        setName(username);
      } else {
        setName("undefined");
      }
    };

    getUsername();
  }, [userID]);

  return name === "User" ? (
    <div style={{ marginTop: "100px" }}>
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  ) : name === "undefined" ? (
    <div>
      <CompleteProfile userID={userID} />
    </div>
  ) : (
    <div>
      <CompletedProfile userID={userID} />
    </div>
  );
}
