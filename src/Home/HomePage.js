import TopBar from "./components/TopBar";
import Body from "./components/Body";
import { useState } from "react";
import { Divider } from "antd";

function HomePage({ email }) {
  const [activeSection, setActiveSection] = useState("Home");
  const [currentBanner, setBanner] = useState("Welcome Back!");

  return (
    <div className="HomePage">
      <TopBar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
        banner={currentBanner}
        setBanner={setBanner}
        email={email}
      />

      <div className="body">
        <Body
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          banner={currentBanner}
          setBanner={setBanner}
        />
      </div>
    </div>
  );
}

export default HomePage;
