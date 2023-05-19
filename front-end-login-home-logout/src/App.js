import "./styles.css";
import LoginPage from "./LoginPage.js";
import { useState, useEffect } from "react";
import HomePage from "./Home/HomePage";

function getStoredStatus() {
  const stat = window.localStorage.getItem("status");
  if (stat === undefined) {
    return false;
  } else {
    return JSON.parse(stat);
  }
}

function setStoredStatus(status) {
  window.localStorage.setItem("status", JSON.stringify(status));
}

export default function App() {
  const [loginStatus, setLoginStatus] = useState(getStoredStatus());

  useEffect(() => {
    setStoredStatus(loginStatus);
  }, [loginStatus]);

  let webBody;

  const handleBackNav = () => {
    setLoginStatus(false);
  };

  if (loginStatus === true) {
    webBody = <HomePage handleBackNav={handleBackNav} />;
  } else {
    webBody = (
      <LoginPage loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
    );
  }

  return <div>{webBody}</div>;
}
