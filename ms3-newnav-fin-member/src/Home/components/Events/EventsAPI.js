import { supabase } from "../../../supabase";
import { message } from "antd";

export async function fetchEvents() {
  let { data: es, error } = await supabase
    .from("Events")
    .select("*")
    .is("active", true)
    .order("date_time", { ascending: false });

  return es;
}

export async function newEvent(values, currentID) {
  const { data, error } = await supabase.from("Events").insert({
    created_by: currentID,
    date_time: values.date_time,
    event_name: values.event_name,
    details: values.details,
    active: true
  });

  if (error) {
    message.error("No access.");
  }

  // You can return any relevant data after creating the new event
}

export async function deleteEvent(eventID, username) {
  if (!username || username === null) {
    message.error("No access.");
  } else {
    const { data, error } = await supabase
      .from("Events")
      .update({ active: false })
      .eq("id", eventID);

    if (error) {
      message.error("No access.");
    } else {
      message.success("Event deleted.");
    }
  }
}
