import { useState } from "react";
import { supabase } from "../../../supabase";
import CreateNewAnn from "./CreateNewAnn";
import NewAnnPop from "./NewAnnPop";
import AnnList from "./AnnList";

export default function AnnMain({ userID }) {
  //console.log("my id:", userID);
  return (
    <div>
      <AnnList userID={userID} />
    </div>
  );
}
