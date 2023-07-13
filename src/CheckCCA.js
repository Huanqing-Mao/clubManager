import { supabase } from "./supabase";
import { useState, useEffect } from "react";
import Enter from "./Enter";

function CheckCCA( { userID } ) {
    const [joined, setJoined] = useState(null)
    const [CCAs, setCCAs] = useState(null);

    async function getCCA(userID) {
        try {
          const { data, error } = await supabase
            .from("Records")
            .select(`
            cca_id,
            user_id,
            manager,
            CCA ( cca_name )
            `)
            .eq("user_id", userID);
    
          if (error) {
            console.error("Error fetching username:", error);
            return false;
          } else {
            if (data && data.length > 0) {
                setCCAs(data);
                return true;
            } else {
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
    }, [userID]);

    if (joined === false) {
        return(
            <div>
                <p>Join CCA</p>
            </div>
        )
    } else if (joined === true) {
        console.log("has joined CCAs: ", joined);
        console.log(CCAs);
        return(
            <div>
                <Enter userID={userID} CCAs={CCAs} />
            </div>
        )
    } else {
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }
}

export default CheckCCA;