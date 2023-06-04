import Home from "./Home";
import CompleteProfile from "./CompleteProfile";
import Profile from "./Profile";
import PollPage from "./PollPage";

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
      />
    );
  } else if (activeSection === "Attendance") {
    content = <p>This is Attendance page.</p>;
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
