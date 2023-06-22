import { useState } from "react";
import { supabase } from "../../../supabase";
import { Input, Button, message } from "antd";
import { v4 as uuidv4 } from "uuid";

const { TextArea } = Input;

export default function CreateNewAnn({ userID }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  /*const handleNewLine = (event) => {
    if (event.key === "Enter") {
      setContent(event.target.value);
      //setContent(event.target.value + "\n");
    }
  };*/

  //onPressEnter={handleNewLine}

  async function handleUpdate() {
    try {
      const timeCreated = new Date();
      const uniqueId = uuidv4();

      // Insert the announcement data into the "announcement" table
      if (title && content) {
        const { data, error } = await supabase.from("Announcements").insert([
          {
            ann_id: uniqueId,
            user_id: userID,
            created_at: timeCreated,
            title: title,
            content: content
          }
        ]);

        if (error) {
          console.error("Error creating announcement:", error.message);
        } else {
          console.log("Announcement created successfully");
          message.success("Announcement Created Successfully!");
          setTitle("");
          setContent("");
        }
      } else {
        message.error("Please fill in all fields!");
      }
    } catch (error) {
      console.error("Error creating announcement:", error.message);
    }
  }

  return (
    <div>
      <Input
        className="announcement-title"
        placeholder="Title"
        maxLength="50"
        onChange={handleTitleChange}
        value={title}
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
        value={content}
        onChange={handleContentChange}
        placeholder="Body"
        autoSize={{ minRows: 3, maxRows: 6 }}
      />

      <Button onClick={handleUpdate}>Submit</Button>
    </div>
  );
}
