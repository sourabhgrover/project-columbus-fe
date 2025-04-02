import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createDomain, updateDomain, resetStatus } from "../rtk/domainSlice";
import { toast } from "react-toastify";

const AddDomainDialog = ({ open, setOpen, domain }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (domain) {
      setValue("domainName", domain.domainName);
      setValue("domainProductOwner", domain.domainProductOwner);
      setValue("domainDescription", domain.domainDescription);
    } else {
      reset();
    }
  }, [domain, setValue, reset]);

  const onSubmit = (data) => {
    if (domain) {
      dispatch(updateDomain({ ...domain, ...data }))
        .unwrap()
        .then(() => {
          toast.success("Domain updated successfully!");
          reset();
          setOpen(false);
          dispatch(resetStatus());
        })
        .catch((error) => {
          toast.error(`Error updating domain: ${error}`);
        });
    } else {
      dispatch(createDomain(data))
        .unwrap()
        .then(() => {
          toast.success("Domain created successfully!");
          reset();
          setOpen(false);
          dispatch(resetStatus());
        })
        .catch((error) => {
          toast.error(`Error creating domain: ${error}`);
        });
    }
  };

  return (
    open && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">{domain ? "Edit Domain" : "Add New Domain"}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Domain Name
              </label>
              <input
                id="domainName"
                {...register("domainName", { required: "Domain name is required" })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="domainProductOwner" className="block text-sm font-medium text-gray-700">
                Domain Product Owner
              </label>
              <input
                id="domainProductOwner"
                {...register("domainProductOwner", { required: "Product owner is required" })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                id="domainDescription"
                {...register("domainDescription")}
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
                {domain ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddDomainDialog;