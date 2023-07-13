import FileList from "./FileList";
import { useState } from "react";

export default function FilesMain( { userID, ccaID, manager } ) {
  return (
    <div>
      <FileList userID={userID} ccaID={ccaID} manager={manager}/>
    </div>
  );
}
