import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import { v4 as uuidv4 } from "uuid";
import { Button, message } from "antd";

export default function CreateCCA() {
  // without customised cca names
  const uuid = uuidv4().toString();
  //console.log(uuid);

  const onClick = async () => {
    try {
      const { data, error } = await supabase
        .from("CCA")
        .insert([{ cca_id: uuid, cca_name: "Test CCA" }]);

      if (error) {
        // Handle the error
        console.error("Error inserting CCA:", error);
        // Show an error message to the user
        // ...
      } else {
        // Insertion successful
        console.log("CCA inserted successfully:", data);
        // Perform any additional actions
        // ...
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Unexpected error:", error);
      // Show an error message to the user
      // ...
    }
  };

  return (
    <div>
      <Button onClick={onClick}> Create CCA Test </Button>
    </div>
  );
}
