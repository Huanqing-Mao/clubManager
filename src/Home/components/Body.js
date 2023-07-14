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
import MemberMain from "./Membership/MemberMain";

export default function Body({
  activeSection,
  setActiveSection,
  banner,
  setBanner,
  userID,
  manager,
  ccaID
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
        ccaID={ccaID}
        manager={manager}
      />
    );
  } else if (activeSection === "Attendance") {
    content = <AttendancePage currentID={userID} manager={manager} ccaID={ccaID}/>;
  } else if (activeSection === "Polls") {
    content = <PollPage userID={userID} manager={manager} ccaID={ccaID}/>;
  } else if (activeSection === "Files") {
    content = <FilesMain userID={userID} manager={manager} ccaID={ccaID}/>;
  } else if (activeSection === "Profile") {
    content = <Profile userID={userID} manager={manager} ccaID={ccaID} />;
  } else if (activeSection === "Announcements") {
    content = <AnnMain userID={userID} manager={manager} ccaID={ccaID}/>;
  } else if (activeSection === "Financials") {
    content = <FinMain />;
  } else if (activeSection === "Member Profile") {
    content = <MemberMain />;
  }

  return <div className="main">{content}</div>;
}
