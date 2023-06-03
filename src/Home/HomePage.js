import TopBar from "./components/TopBar";
import Body from "./components/Body";
import { useState } from "react";
import { Divider } from "antd";

function HomePage({ handleBackNav, userID }) {
  const [activeSection, setActiveSection] = useState("Home");
  const [currentBanner, setBanner] = useState("Welcome Back!");

  return (
    <div className="HomePage">
      <TopBar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
        banner={currentBanner}
        setBanner={setBanner}
        handleBackNav={handleBackNav}
        userID={userID}
      />

      <div className="body">
        <Body
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          banner={currentBanner}
          setBanner={setBanner}
          userID={userID}
        />
      </div>
    </div>
  );
}

export default HomePage;
