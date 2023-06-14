import Home from "./Home";
import CompleteProfile from "./CompleteProfile";
import Profile from "./Profile";
import PollPage from "./PollPage";
import AttendancePage from "./AttendancePage";
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
  const [currentID, setCurrentID] = useState('');

  async function getUserID() {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    setCurrentID(user.id);
    console.log(currentID);
  }

  useEffect(() => {
    getUserID();
  }, []);

  if (activeSection === "Home") {
    content = (
      <Home
        setActiveSection={setActiveSection}
        activeSection={activeSection}
        banner={banner}
        setBanner={setBanner}
        currentID={currentID}
      />
    );
  } else if (activeSection === "Attendance") {
    content = <AttendancePage currentID={currentID} />;
  } else if (activeSection === "Polls") {
    content = <PollPage />;
  } else if (activeSection === "Files") {
    content = <p>This is Files page.</p>;
  } else if (activeSection === "Profile") {
    content = <Profile userID={userID} />;
  } else if (activeSection === "Announcements") {
    content = <p>This is announcements page.</p>;
  }

  return <div className="main">{content}</div>;
}
