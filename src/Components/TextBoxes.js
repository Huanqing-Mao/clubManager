import { useState } from "react";

export default function TextBoxes({ loginStatus, setLoginStatus }) {
  function logIn() {
    setLoginStatus(true);
  }

  return (
    <div className="textBoxes">
      <p> User Name: </p>
      <input className="login-input" type="text" />

      <p> Password: </p>
      <input className="login-input" type="text" />
      <p> </p>

      <button type="submit" onClick={logIn}>
        {" "}
        Log In{" "}
      </button>
      <text> </text>

      <button type="submit"> Sign Up</button>
      <p></p>
    </div>
  );
}
