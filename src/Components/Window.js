import tlogo from "./tlogo.png";

import TextBoxes from "./TextBoxes";
import { useState } from "react";
import LoginBoxes from "./LoginBoxes";

export default function Window({ loginStatus, setLoginStatus }) {
  const [isRotated, setIsRotated] = useState(false);

  const handleImageClick = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className="window">
      <div className="loginBox">
        <h1 className="loginTitle"> Member/Manager Log-in</h1>
        <LoginBoxes />
      </div>
      <div
        className="tlogo"
        style={{
          flex: "1"
        }}
      >
        <img
          className={`image ${isRotated ? "rotate" : ""}`}
          onClick={handleImageClick}
          src={tlogo}
          alt="transparent Logo"
          style={{
            height: "400px"
          }}
        />
      </div>
    </div>
  );
}
