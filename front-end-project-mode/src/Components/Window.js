import tlogo from "./tlogo.png";

import TextBoxes from "./TextBoxes";
import { useState } from "react";

export default function Window() {
  const [isRotated, setIsRotated] = useState(false);

  const handleImageClick = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className="window">
      <div className="loginBox">
        <h1 className="loginTitle" style={{ fontSize: "30px" }}>
          {" "}
          Member/Manager Log-in
        </h1>
        <TextBoxes />
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
