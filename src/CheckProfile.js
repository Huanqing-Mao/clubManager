import { supabase } from "./supabase";
import { useState, useEffect } from "react";
import HomePage from "./Home/HomePage";
import CompleteProfile from "./Home/components/CompleteProfile";
import CheckCCA from "./CheckCCA";
import Enter from "./Enter";
import { Spin } from "antd";

function CheckProfile({ userID }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getProfile(uID) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("name")
        .eq("user_id", uID)
        .single();
  
      if (error) {
        console.error("Error fetching username:", error);
        setProfile(false);
      } else {
        if (data) {
          setProfile(true);
        } else {
          setProfile(false);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching username:", error);
      setProfile(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfile(userID);
    console.log("Profile: ", profile);
  }, [userID]);

  if (isLoading) {
    console.log("profile still loading")
    return (
      <div>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  } else if (profile === true) {
    console.log("now entering check cca: ", profile)
    console.log(userID);
    return (
      <div>
        <Enter userID={userID} />
      </div>
    );
  } else {
    return (
      <div className="centered">
        <CompleteProfile userID={userID} />
      </div>
    );
  }
}

export default CheckProfile;