import { message, Button } from "antd";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import SelectFaculty from "./SelectFaculty";
import SelectPE from "./SelectPE";

export default function UpdateProfile({ userID }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [pe, setPE] = useState("");

  async function fetchDataById(userId) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", userId)
        .single();
      console.log(data);

      if (error) {
        console.error("Error fetching username:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  }
  useEffect(() => {
    const getData = async () => {
      const userData = await fetchDataById(userID);

      if (userData) {
        console.log("data:", userData);
        setName(userData.name);
        setEmail(userData.email);
        setYear(userData.year);
        setFaculty(userData.faculty);
        setPE(userData.prior_experience);
      }
    };
    getData();
  }, [userID]);

  async function updateCCARoles(ccaID, userID) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("ccas")
      .eq("user_id", userID)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return;
    }

    const existingCCAs = userData.ccas || [];
    const updatedCCAs = [...existingCCAs, { cca: ccaID, manager: true }];

    const { data: updateData, error: updateError } = await supabase
      .from("users")
      .update({ ccas: updatedCCAs })
      .eq("user_id", userID);

    if (updateError) {
      console.error("Error updating ccas array:", updateError);
      return;
    }

    console.log("Array updated successfully:", updateData);
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
    } else {
      const { data, error } = await supabase
        .from("users")
        .update({
          email: email,
          name: name,
          year: updateYear,
          faculty: faculty,
          prior_experience: pe
        })
        .eq("user_id", userID);

      if (error) {
        console.error("Error updating data: ", error);
      } else {
        console.log("Data updated successfully");
        message.success("Data Updated Successfully!");
        window.location.reload(true);
      }
    }

    setEmail("");
    setName("");
    setYear("");
    setFaculty("");
    setPE("");
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
        <h1>Update Your Profile</h1>
        {/*<Button
          onClick={() =>
            updateCCARoles("1bc3b3f3-d81f-4910-acd0-b6a342014ef2", userID)
          }
        >
          {" "}
          Insert CCA data
        </Button> */}

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
            <SelectFaculty defaultFac={faculty} setFaculty={setFaculty} />
            <br />
            <p> Prior Experience: </p>
            <SelectPE defaultPE={pe} setPE={setPE} />
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
