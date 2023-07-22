import { useState } from "react";
import { supabase } from "../../supabase";
import SelectFaculty from "./SelectFaculty";
import SelectPE from "./SelectPE";
import { message } from "antd";

export default function CompleteProfile({ userID }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [pe, setPE] = useState("");

  const handleSignOut = async () => {
    console.log(userID);
    try {
      await supabase.auth.signOut();
      console.log("Success signing out!");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function updateInformation(event) {
    event.preventDefault(); // Prevent form submission behavior

    const updateYear = parseInt(year, 10);
    if (
      email === "" ||
      name === "empty" ||
      year === "" ||
      faculty === "" ||
      pe === ""
    ) {
      message.error("Please fill in all the fields!");
    } else if (!isValidEmail(email)) {
      message.error("Please put in a valid email!");
    } else {
      const { error } = await supabase.from("users").insert({
        user_id: userID,
        email: email,
        name: name,
        year: updateYear,
        faculty: faculty,
        prior_experience: pe
      });

      if (error) {
        console.error("Error inserting data: ", error);
      } else {
        console.log("Data inserted successfully");
        message.success("Information updated successfully! ");
        window.location.reload(true);
      }

      setEmail("");
      setName("");
      setYear("");
      setFaculty("");
      setPE("");
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleYearChange = (event) => {
    // Parse the input value to an integer
    const value = parseInt(event.target.value, 10);

    // Check if the value is a number and within the range 1 to 5
    if (!isNaN(value) && value >= 1 && value <= 5) {
      setYear(value.toString());
    }
    // If the value is not a number or not within the range, set it to an empty string
    else {
      setYear("");
      message.warning("Please input a value from 1 to 5!");
    }
  };

  const handleFaultyChange = (event) => {
    setFaculty(event.target.value);
  };

  const handlePEChange = (event) => {
    setPE(event.target.value);
  };

  return (
    <>
      <div className="CompleteProfile">
        <h1>Oops, you haven't filled in your details :( </h1>
        <h2>Complete Your Profile</h2>
        <form>
          <div>
            <p> Back-up Email: </p>
            <input
              className="profileInput"
              type="text"
              value={email}
              onChange={handleEmailChange}
              maxLength={50}
            />
            <br />
            <p> Name: </p>
            <input
              className="profileInput"
              type="text"
              value={name}
              onChange={handleNameChange}
              maxLength={100}
            />
            <br />
            <p>
              {" "}
              Year:
              <br />
              <span style={{ fontStyle: "italic", fontSize: "70%" }}>
                (Please put 5 if you are a graduate student)
              </span>
            </p>
            <input
              className="profileInput"
              type="number"
              value={year}
              onChange={handleYearChange}
            />
            <br />
            <p> Faculty: </p>
            <SelectFaculty setFaculty={setFaculty} />
            <br />
            <p> Prior Experience With Our App: </p>
            <SelectPE setPE={setPE} />
            <br />
          </div>

          <button
            className="profileChangeButton"
            type="submit"
            onClick={updateInformation}
          >
            Submit Information
          </button>
          <p></p>
        </form>
        <button className="logOut" type="submit" onClick={handleSignOut}>
          Log Out
        </button>
      </div>
    </>
  );
}
