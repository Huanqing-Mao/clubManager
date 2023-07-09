import { supabase } from "../../supabase";

import { useEffect, useState } from "react";

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

export default function FetchName({ userID }) {
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

  return <text>{name}</text>;
}
