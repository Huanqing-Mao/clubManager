import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import FetchName from "./FetchName";
import CompleteProfile from "./CompleteProfile";
import UpdateProfile from "./UpdateProfile";
import DisplayProfile from "./DisplayProfile";
import CompletedProfile from "./CompletedProfile";

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
      }
    };

    getUsername();
  }, [userID]);

  return name === "User" ? (
    <div>
      <CompleteProfile userID={userID} />
    </div>
  ) : (
    <div>
      <CompletedProfile userID={userID} />
    </div>
  );
}
