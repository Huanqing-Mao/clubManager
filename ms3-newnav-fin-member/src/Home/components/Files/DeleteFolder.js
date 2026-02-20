import { Button, Modal, message } from "antd";
import { useState } from "react";
import { supabase } from "../../../supabase";

export default function FolderDelete({
  folderName,
  listFolders,
  setFolderName
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      // Get the list of files in the folder
      const { data, error } = await supabase.storage
        .from("cca")
        .list(folderName, { limit: 100 });

      if (error) {
        console.error("Error listing files:", error.message);
        // Handle the error appropriately
        return;
      }

      // Delete each file within the folder
      for (const file of data) {
        console.log(file.name);
        await supabase.storage
          .from("cca")
          .remove([`${folderName}/${file.name}`]);
      }

      // Delete the folder itself
      await supabase.storage.from("cca").remove([folderName]);

      console.log("Folder deleted successfully");
      message.success("Folder deleted!");
      // Handle the success case
    } catch (error) {
      console.error("Error deleting folder:", error.message);
      // Handle the error appropriately
    }

    // Close the modal
    setIsModalVisible(false);
    listFolders();
    setFolderName("");
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button onClick={openModal}>Delete Folder</Button>

      <Modal
        title="Confirm Folder Deletion"
        open={isModalVisible}
        onCancel={closeModal}
        onOk={handleDelete}
      >
        <p>Are you sure you want to delete the folder?</p>
      </Modal>
    </div>
  );
}
