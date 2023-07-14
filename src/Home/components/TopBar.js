import logo from "./cm.png";
import { supabase } from "../../supabase";
import FetchName from "./FetchName";
import { UserOutlined, 
  HomeOutlined, 
  BellOutlined, 
  ScheduleOutlined, 
  LikeOutlined, 
  FolderOutlined,
  SolutionOutlined,
  DollarCircleOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState, useEffect } from "react";

/*const handleSignOut = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};*/

const defaultSections = [
  {
    label: 'Home',
    key: 'Home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Announcements',
    key: 'Announcements',
    icon: <BellOutlined />,
  },
  {
    label: 'Attendance',
    key: 'Attendance',
    icon: <ScheduleOutlined />,
  },
  {
    label: 'Polls',
    key: 'Polls',
    icon: <LikeOutlined />,
  },
  {
    label: 'Files',
    key: 'Files',
    icon: <FolderOutlined />,
  },
];

export default function TopBar({
  setActiveSection,
  activeSection,
  banner,
  setBanner,
  handleBackNav,
  userID,
  manager
}) {

  const [sections, setSections] = useState([]);

  useEffect(() => {
    let updatedSections = [...defaultSections];

    if (manager) {
      updatedSections.push(
        {
          label: 'Members',
          key: 'Member Profile',
          icon: <SolutionOutlined />
        },
        {
          label: "Financials",
          key: 'Financials',
          icon: <DollarCircleOutlined />
        }
      );
    }

    setSections(updatedSections);
  }, [manager]);

  const onClick = (e) => {
    console.log('click ', e);
    setActiveSection(e.key);
    setBanner(e.key);
  }


  function goProfile() {
    setActiveSection("Profile");
    setBanner("Personal Profile");
  }

  function goHome() {
    setActiveSection("Home");
    setBanner("Welcome Back!");
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

      <div className="Navigation">
        <nav className="navBar">
          <Menu onClick={onClick} 
          selectedKeys={[activeSection]} 
          mode="horizontal" 
          items={sections} 
          style={{ width: 1350 }}/>

        </nav>
      </div>
    </div>
  );
}
