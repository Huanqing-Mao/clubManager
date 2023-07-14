import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import { Spin } from "antd";
import MemberList from "./MemberList";

export default function MemeberMain() {
  return (
    <div>
      <MemberList />
    </div>
  );
}
