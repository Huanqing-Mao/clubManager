import TopBar from "./components/TopBar";
import Body from "./components/Body";
import { useState, useEffect } from "react";
import { Divider, Alert } from "antd";
import { supabase } from "../supabase";

function HomePage({ handleBackNav, userID, ccaID, manager }) {
  const [activeSection, setActiveSection] = useState("Home");
  const [currentBanner, setBanner] = useState("Welcome Back!");
  const [info, setInfo] = useState("");

  console.log("current CCA:", ccaID);
  console.log("current user:", userID);
  console.log("manager:", manager);

  async function fetchUsernameById(userId) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("name")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching username:", error);
        return null;
      }

      return data.name;
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  }

  useEffect(() => {
    const getUsername = async () => {
      const username = await fetchUsernameById(userID);
      if (username) {
        setInfo(username);
      } else {
        setInfo("nil");
      }
    };

    getUsername();
  }, [userID]);

  return (
    <div className="HomePage">
      <div className="navbar">
        <TopBar
          setActiveSection={setActiveSection}
          activeSection={activeSection}
          banner={currentBanner}
          setBanner={setBanner}
          handleBackNav={handleBackNav}
          userID={userID}
          manager={manager}
        />
      </div>

      <div className="body">
        {info === "nil" ? (
          <Alert
            message="Complete Your Profile"
            description="Please complete your profile before making edits, or else you will not be able to access all functions. Thank you!"
            type="info"
            showIcon
            closable
          />
        ) : (
          <></>
        )}

        <Body
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          banner={currentBanner}
          setBanner={setBanner}
          userID={userID}
          manager={manager}
          ccaID={ccaID}
        />
      </div>
    </div>
  );
}

export default HomePage;
