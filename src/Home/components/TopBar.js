import logo from "./cm.png";
import { supabase } from "../../supabase";
import FetchName from "./FetchName";
import { UserOutlined } from "@ant-design/icons";

/*const handleSignOut = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};*/

export default function TopBar({
  setActiveSection,
  activeSection,
  banner,
  setBanner,
  handleBackNav,
  userID
}) {
  function goHome() {
    setActiveSection("Home");
    setBanner("Welcome Back!");
  }

  function goAttendance() {
    setActiveSection("Attendance");
    setBanner("Attendance");
  }

  function goPolls() {
    setActiveSection("Polls");
    setBanner("Polls");
  }

  function goFiles() {
    setActiveSection("Files");
    setBanner("Files");
  }

  function goProfile() {
    setActiveSection("Profile");
    setBanner("Personal Profile");
  }

  return (
    <div>
      <div className="App-header">
        <title>{activeSection}</title>
        <div>
          <img src={logo} alt="logo" className="logo" onClick={goHome} />
          <h1 className="banner">{banner}</h1>
          <a onClick={goProfile} className="profile">
            <UserOutlined />
            <FetchName userID={userID} />
          </a>
        </div>
      </div>
      <hr />

      <div className="Navigation">
        <nav className="navBar">
          <ul>
            <li>
              <a onClick={goHome}>Home</a>
            </li>
            <li>
              <a onClick={goAttendance}>Attendance</a>
            </li>
            <li>
              <a onClick={goPolls}>Polls</a>
            </li>
            <li>
              <a onClick={goFiles}>Files</a>
            </li>
          </ul>
        </nav>
      </div>
      <hr />
    </div>
  );
}
