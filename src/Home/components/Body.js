import Home from "./Home";
import CompleteProfile from "./CompleteProfile";
import Profile from "./Profile";
import PollPage from "./PollPage";
import AttendancePage from "./AttendancePage";
import FilesMain from "./Files/FilesMain";
import AnnMain from "./Announcements/AnnMain";
import FinMain from "./Financials/FinMain";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";

export default function Body({
  activeSection,
  setActiveSection,
  banner,
  setBanner,
  userID
}) {
  let content;

  if (activeSection === "Home") {
    console.log("body id:", userID);
    content = (
      <Home
        setActiveSection={setActiveSection}
        activeSection={activeSection}
        banner={banner}
        setBanner={setBanner}
        userID={userID}
      />
    );
  } else if (activeSection === "Attendance") {
    content = <AttendancePage currentID={userID} />;
  } else if (activeSection === "Polls") {
    content = <PollPage />;
  } else if (activeSection === "Files") {
    content = <FilesMain />;
  } else if (activeSection === "Profile") {
    content = <Profile userID={userID} />;
  } else if (activeSection === "Announcements") {
    content = <AnnMain userID={userID} />;
  } else if (activeSection === "Financials") {
    content = <FinMain />;
  } else if (activeSection === "Member Profile") {
    content = <p>This is Member Profile page</p>;
  }

  return <div className="main">{content}</div>;
}
