import { supabase } from "./supabase";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import HomePage from "./Home/HomePage";

function Enter( { userID, CCAs } ) {
    const [choice, setChoice] = useState(null);
    const [manager, setManager] = useState(null);

    if (choice === null || choice === undefined) {
        return (
            <div>
                <Dashboard userID={userID} CCAs={CCAs} setChoice={setChoice} setManager={setManager} choice={choice}/>
            </div>
        )
    } else {
        console.log("chosen CCA: ", choice);
        return (
            <div>
                <HomePage userID={userID} ccaID={choice} manager={manager} />
            </div>
        )
    }
}

export default Enter;