import Home from "./Home";
import CompleteProfile from "./CompleteProfile";
import Profile from "./Profile";
import PollPage from "./PollPage";
import FilesMain from "./Files/FilesMain";
import AnnMain from "./Announcements/AnnMain";

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
    content = <p>This is Attendance page.</p>;
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
