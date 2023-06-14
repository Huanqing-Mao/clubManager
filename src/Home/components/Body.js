import Home from "./Home";
import CompleteProfile from "./CompleteProfile";
import Profile from "./Profile";
import PollPage from "./PollPage";
import AttendancePage from "./AttendancePage";
import FilesMain from "./Files/FilesMain";
import AnnMain from "./Announcements/AnnMain";
import { useState, useEffect } from 'react';
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
    content = content = <AttendancePage currentID={userID} />;
  } else if (activeSection === "Polls") {
    content = <PollPage />;
  } else if (activeSection === "Files") {
    content = <FilesMain />;
  } else if (activeSection === "Profile") {
    content = <Profile userID={userID} />;
  } else if (activeSection === "Announcements") {
    content = <AnnMain userID={userID} />;
  }

  return <div className="main">{content}</div>;
}
