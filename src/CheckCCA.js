import { supabase } from "./supabase";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import Enter from "./Enter";
import JoinCCA from "./JoinCCA";

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
    }, [userID, joined]);

    if (joined === false) {
        return(
            <div>
                <h2>You haven't join any CCA yet!</h2>
                <JoinCCA userID={userID} />
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
            <div className="centered">
                <Spin tip="Loading" size="large">
                <div className="content" />
                </Spin>
            </div>
        )
    }
}

export default CheckCCA;