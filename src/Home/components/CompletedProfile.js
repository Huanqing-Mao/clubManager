import UpdateProfile from "./UpdateProfile";
import DisplayProfile from "./DisplayProfile";
import MenuBar from "./MenuBar";
import CCAdashboard from "../../CCAdashboard";
import { useState } from "react";
import { supabase } from "../../supabase";

export default function CompletedProfile({
  userID,
  setCCA,
  setManager,
  ccaID,
  manager
}) {
  const [page, setPage] = useState("myProfile");
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  return (
    <div className="CompletedProfile">
      <MenuBar setPage={setPage} />
      {page === "myProfile" ? (
        <DisplayProfile userID={userID} />
      ) : page === "logout" ? (
        <>
          <br />
          <h3> Thanks for Using Club Manager! </h3>
          <button className="logOut" type="submit" onClick={handleSignOut}>
            Log Out
          </button>
        </>
      ) : page === "update" ? (
        <UpdateProfile userID={userID} />
      ) : (
        <div>
          <br></br>
          <br></br>
          <CCAdashboard
            userID={userID}
            setChoice={setCCA}
            setManager={setManager}
            choice={ccaID}
            manager={manager}
            showLogOut={false}
          />
        </div>
      )}
    </div>
  );
}
