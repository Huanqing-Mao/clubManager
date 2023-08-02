import { supabase } from "./supabase";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import HomePage from "./Home/HomePage";
import CCAdashboard from "./CCAdashboard";

function Enter({ userID }) {
  const [choice, setChoice] = useState(null);
  const [manager, setManager] = useState(null);

  if (choice === null || choice === undefined) {
    return (
      <div className="CCAdashboard">
        <h1>Organisation Dashboard</h1>
        <CCAdashboard
          userID={userID}
          setChoice={setChoice}
          setManager={setManager}
          choice={choice}
          manager={manager}
          showLogOut={true}
        />
      </div>
    );
  } else {
    console.log("chosen CCA: ", choice);
    return (
      <div>
        <HomePage
          userID={userID}
          ccaID={choice}
          manager={manager}
          setCCA={setChoice}
          setManager={setManager}
        />
      </div>
    );
  }
}

export default Enter;
