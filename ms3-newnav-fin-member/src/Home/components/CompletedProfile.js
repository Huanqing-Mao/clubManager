import UpdateProfile from "./UpdateProfile";
import DisplayProfile from "./DisplayProfile";
import MenuBar from "./MenuBar";
import { useState } from "react";
import { supabase } from "../../supabase";

export default function CompletedProfile({ userID }) {
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
      ) : (
        <UpdateProfile userID={userID} />
      )}
    </div>
  );
}
