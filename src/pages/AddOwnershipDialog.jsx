import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createOwnership, updateOwnership, resetStatus } from "../rtk/ownerShipSlice";
import { toast } from "react-toastify";

const AddOwnershipDialog = ({ open, setOpen, ownership }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (ownership) {
      // Populate form fields when editing
      setValue("name", ownership.name);
      setValue("description", ownership.description);
    } else {
      reset(); // Reset form when adding a new ownership
    }
  }, [ownership, setValue, reset]);

  const onSubmit = (data) => {
    if (ownership) {
      // Update ownership if editing
      dispatch(updateOwnership({ ...ownership, ...data }))
        .unwrap()
        .then(() => {
          toast.success("Ownership updated successfully!");
          reset();
          setOpen(false);
          dispatch(resetStatus());
        })
        .catch((error) => {
          toast.error(`Error updating ownership: ${error}`);
        });
    } else {
      // Create new ownership if adding
      dispatch(createOwnership(data))
        .unwrap()
        .then(() => {
          toast.success("Ownership created successfully!");
          reset();
          setOpen(false);
          dispatch(resetStatus());
        })
        .catch((error) => {
          toast.error(`Error creating ownership: ${error}`);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    dispatch(resetStatus());
  };

  return (
    open && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">
            {ownership ? "Edit Ownership" : "Add New Ownership"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Owner Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Owner name is required" })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
                onClick={handleClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                {ownership ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddOwnershipDialog;