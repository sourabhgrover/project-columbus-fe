import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createOwnership } from "../rtk/ownerShipSlice";
import { toast } from "react-toastify";

const AddOwnershipDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(createOwnership(data))
      .unwrap()
      .then(() => {
        reset();
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error creating ownership:", error);
        toast.error(`Error: ${error}`);
      });
  };

  return (
    open && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Add New Ownership</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                Owner Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Owner name is required" })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                id="description"
                {...register("description")}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddOwnershipDialog;