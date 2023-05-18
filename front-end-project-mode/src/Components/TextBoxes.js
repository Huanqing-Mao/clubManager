import { useState } from "react";

export default function TextBoxes() {
  return (
    <div className="textBoxes">
      <p> User Name: </p>
      <input type="text" />

      <p> Password: </p>
      <input type="text" />
      <p> </p>

      <button type="submit"> Log In </button>
      <text> </text>

      <button type="submit"> Sign Up</button>
      <p></p>
    </div>
  );
}
