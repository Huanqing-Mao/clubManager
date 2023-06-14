import { supabase } from "../../../supabase";

export async function fetchEvents() {
    let { data: es, error } = await supabase
      .from("Events")
      .select("*")
      .is("active", true)
      .order('date_time', { ascending: false });
  
    return es;
};

export async function newEvent(values, currentID) {
    const { nerror } = await supabase.from("Events").insert({
      created_by: currentID,
      date_time: values.date_time,
      event_name: values.event_name,
      details: values.details,
      active: true
    });
  
    // You can return any relevant data after creating the new event
};

 export async function deleteEvent(eventID) {
  const { derror } = await supabase
    .from("Events")
    .update({ active: false })
    .eq("id", eventID);
}