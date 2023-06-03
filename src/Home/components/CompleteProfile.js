import { useState } from "react";
import { supabase } from "../../supabase";
import SelectFaculty from "./SelectFaculty";
import SelectPE from "./SelectPE";

export default function CompleteProfile({ userID }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [pe, setPE] = useState("");

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
      alert("Please fill in all the fields!");
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
        alert("Information updated successfully! ");
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
    setYear(event.target.value);
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
            />
            <br />
            <p> Name: </p>
            <input
              className="profileInput"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
            <br />
            <p> Year: </p>
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
            <p> Prior Experience: </p>
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
        </form>
      </div>
    </>
  );
}
