import { useState } from "react";
import { supabase } from "../../../supabase";
import { Input, Button, message } from "antd";
const { TextArea } = Input;

export default function EditAnn({ content, title, annID }) {
  const [displayContent, setDisplayContent] = useState(content);
  const [displayTitle, setDisplayTitle] = useState(title);
  const handleTitleChange = (event) => {
    setDisplayTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setDisplayContent(event.target.value);
  };

  /*const handleNewLine = (event) => {
    if (event.key === "Enter") {
      setDisplayContent(event.target.value + "\n");
    }
  };*/

  async function updateRow() {
    const timeCreated = new Date();
    try {
      const { data, error } = await supabase
        .from("Announcements")
        .update({
          created_at: timeCreated,
          title: displayTitle,
          content: displayContent
        })
        .eq("ann_id", annID);

      if (error) {
        console.error("Error updating row:", error.message);
      } else {
        message.success("Announcement Updated!");
        console.log("Row updated successfully:", data);
      }
    } catch (error) {
      console.error("Error updating row:", error.message);
    }
  }

  return (
    <div>
      <Input
        className="announcement-title"
        placeholder="Title"
        maxLength="50"
        onChange={handleTitleChange}
        value={displayTitle}
        style={{
          width: "100%"
        }}
      />
      <p></p>

      <TextArea
        showCount
        maxLength={1000}
        style={{
          height: 120,
          marginBottom: 24
        }}
        value={displayContent}
        onChange={handleContentChange}
        placeholder="Body"
        autoSize={{ minRows: 3, maxRows: 6 }}
      />

      <Button onClick={updateRow}>Update</Button>
    </div>
  );
}
