import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import { Spin } from "antd";
import MemberList from "./MemberList";

export default function MemeberMain( { userID, manager, ccaID } ) {
  return (
    <div>
      <h2>CCA Code:</h2>
      <p className="ccaID">{ccaID}</p>
      <p>Share this code with your members so they can join your organisation!</p>
      
      <MemberList userID={userID} manager={manager} ccaID={ccaID}/>
    </div>
  );
}
