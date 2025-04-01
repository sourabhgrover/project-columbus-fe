import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import AddOwnershipDialog from "./AddOwnershipDialog";
import { fetchOwnerships, deleteOwnership , resetStatus } from "../rtk/ownerShipSlice";
import OwnershipCard from "../components/OwnershipCard";

const ManageOwnership = () => {
  const dispatch = useDispatch();
  const { ownerships, status, error } = useSelector((state) => state.ownership);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOwnerships());
    }
  }, [status, dispatch]);

  const [open, setOpen] = useState(false);
  const [selectedOwnership, setSelectedOwnership] = useState(null);

  const handleAddOwnership = () => {
    setSelectedOwnership(null); // Clear selected ownership when adding
    setOpen(true);
  };

  const handleEditOwnership = (ownership) => {
    setSelectedOwnership(ownership); // Set selected ownership when editing
    setOpen(true);
  };

  const handleDeleteOwnership = (id) => {
    dispatch(deleteOwnership(id))
      .unwrap()
      .then((deletedId) => {
        console.log(`Ownership with ID ${deletedId} deleted successfully!`); // Debugging
      toast.success("Ownership deleted successfully!");
      dispatch(resetStatus());
        // dispatch(fetchOwnerships());
      })
      .catch((error) => {
        console.error("Error deleting ownership:", error);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-12">
        <button
          onClick={handleAddOwnership}
          className="bg-blue-500 text-white py-3 px-6 rounded-md flex items-center hover:bg-blue-600 text-sm font-semibold"
        >
          <PlusIcon className="h-6 w-6 mr-3" />
          Add new ownership
        </button>
      </div>

      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownerships.map((ownership) => (
          <OwnershipCard
            key={ownership._id}
            id={ownership._id}
            name={ownership.name}
            description={ownership.description}
            onEdit={() => handleEditOwnership(ownership)} // Pass ownership to edit
            onDelete={() => handleDeleteOwnership(ownership._id)} // Pass ownership ID to delete
          />
        ))}
      </div>

      <AddOwnershipDialog
        open={open}
        setOpen={setOpen}
        ownership={selectedOwnership} // Pass selected ownership for editing
      />
    </div>
  );
};

export default ManageOwnership;