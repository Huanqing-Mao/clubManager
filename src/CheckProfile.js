import { supabase } from "./supabase";
import { useState, useEffect } from "react";
import HomePage from "./Home/HomePage";
import CompleteProfile from "./Home/components/CompleteProfile";

function CheckProfile( { userID }) {
    const [profile, setProfile] = useState(null);

    async function getProfile(userID) {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("name")
            .eq("user_id", userID)
            .single();
    
          if (error) {
            console.error("Error fetching username:", error);
            return false;
          }
    
          return true;
        } catch (error) {
          console.error("Error fetching username:", error);
          return false;
        }
    }

    useEffect(() => {
        //formStatus();
        getProfile(userID).then((value) => setProfile(value));
        console.log("profile:", profile);
    }, [userID]);

    if (profile === true) {
        return (
            <div>
                <p>Check CCA</p>
            </div>
        )
    } else if (profile === false) {
      return (
        <div>
          <CompleteProfile userID={userID}/>
        </div>
      )
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
}

export default CheckProfile;
