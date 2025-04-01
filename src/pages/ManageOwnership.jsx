import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import AddOwnershipDialog from "./AddOwnershipDialog"; // Replace with ownership-specific dialog
import { fetchOwnerships, deleteOwnership } from "../rtk/ownerShipSlice"; // Use ownershipSlice actions
import OwnershipCard from "../components/OwnershipCard";

const ManageOwnership = () => {
  const dispatch = useDispatch();
  const { ownerships, status, error } = useSelector((state) => state.ownership);
console.log(ownerships, status, error);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOwnerships());
    }
  }, [status, dispatch]);

  const [open, setOpen] = useState(false);

  // Handlers for user actions
  const handleAddOwnership = () => setOpen(true);

  // Handle delete logic with optimistic UI update
  const handleDeleteOwnership = (id) => {
    const updatedOwnerships = ownerships.filter((ownership) => ownership.id !== id);
    dispatch({ type: "ownership/updateOwnerships", payload: updatedOwnerships });

    dispatch(deleteOwnership(id))
      .unwrap()
      .then(() => {
        dispatch(fetchOwnerships());
      })
      .catch((error) => {
        console.error("Error deleting ownership:", error);
        dispatch({ type: "ownership/updateOwnerships", payload: ownerships });
      });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-12">
        <div className="flex space-x-2">
          <button
            onClick={handleAddOwnership}
            className="bg-blue-500 text-white py-3 px-6 rounded-md flex items-center hover:bg-blue-600 text-sm font-semibold"
          >
            <PlusIcon className="h-6 w-6 mr-3" />
            Add new ownership
          </button>
        </div>
      </div>

      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownerships.map((ownership) => (
          <OwnershipCard
            key={ownership._id}
            id={ownership._id}
            name={ownership.name} // Replace with ownership-specific field
            description={ownership.description} // Replace with ownership-specific field
            onDelete={handleDeleteOwnership} // Pass ownership delete handler
          />
        ))}
      </div>

      <AddOwnershipDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default ManageOwnership;