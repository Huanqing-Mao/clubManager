import { useState, useEffect, useLayoutEffect } from "react";
import { supabase } from "../../../supabase";
import { Checkbox, Divider, Button, message, Spin } from "antd";

function EventDetails({ eventID, currentID, deleteEvent, ccaID, manager }) {
  const [event, setEvent] = useState("null");
  const [attend, setAttend] = useState(false);
  const [record, setRecord] = useState(null);
  const [load, setLoad] = useState("loading");
  const [profile, setProfile] = useState(null);

  async function fetchData() {
    let { data: evs, error } = await supabase
      .from("Events")
      .select("*")
      .eq("id", eventID);
    if (evs !== null && evs[0] !== undefined) {
      setEvent(evs[0]);
      console.log("selected event:");
    }
    console.log(event);
  }

  async function getAttendance() {
    const { data: at, aerror } = await supabase
      .from("Attendance")
      .select("*")
      .match({
        event_id: eventID,
        member_id: currentID
      });
    console.log(currentID);
    console.log("current id");
    console.log(at);
    console.log("attendance status");
    if (at !== null && at[0] !== undefined) {
      setAttend(at[0].attending);
      setRecord(true);
    } else {
      setAttend(false);
      setRecord(false);
    }
    setLoad("loaded");
  }

  async function getProfile(userID) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("name")
        .eq("user_id", userID)
        .single();

      if (error) {
        console.error("Error fetching username:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error fetching username:", error);
      return false;
    }
  }

  useEffect(() => {
    fetchData();
    //getAttendance();
    getProfile(currentID).then((value) => setProfile(value));
    console.log("profile:", profile);
  }, [eventID]);

  useEffect(() => {
    getAttendance();
  }, [eventID, attend]);

  async function onChange(e) {
    const updatedAtt = !attend;
    setAttend(updatedAtt);
    console.log(attend);
    console.log(`checked = ${e.target.checked}`);
    try {
      if (record) {
        const { data, error } = await supabase
          .from("Attendance")
          .update({ attending: e.target.checked })
          .match({
            event_id: eventID,
            member_id: currentID
          });
        if (error) {
          message.error("No access.");
        } else {
          message.success("Update Success!");
        }
      } else {
        const { data, error } = await supabase.from("Attendance").insert([
          {
            event_id: eventID,
            member_id: currentID,
            attending: e.target.checked
          }
        ]);

        if (error) {
          message.error("No access.");
          console.log("error message:", error);
        } else {
          message.success("Your response has been recorded!");
          console.log("problem here");
        }
      }
    } catch (error) {
      console.log("There's something wrong. Please contact the staff.");
    }
  }

  if (eventID === null || event === null) {
    return (
      <div>
        <h2>Please select an event.</h2>
      </div>
    );
  } else if (load === "loading") {
    return (
      <div>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  } else {
    return (
      <div>
        <h2>{event.event_name}</h2>
        <p>{event.date_time}</p>
        <Divider />
        <p>{event.details}</p>
        <br></br>
        <Checkbox onChange={onChange} checked={attend} value={attend}>
          I am attending this event.
        </Checkbox>
        <br></br>
        <br></br>
        {manager === true ?
        <Button
          onClick={() => deleteEvent(eventID, profile)}
          className="AntButton"
          type="primary"
        >
          Delete this event
        </Button> : <></> }
      </div>
    );
  }
}

export default EventDetails;
