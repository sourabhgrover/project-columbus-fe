import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import AddDomainDialog from "./AddDomainDialog"; // Updated dialog for domains
import { fetchDomains, deleteDomain, resetStatus } from "../rtk/domainSlice"; // Updated actions for domains
import DomainCard from "../components/DomainCard"; // Updated card component for domains
import { toast } from "react-toastify";

const ManageDomains = () => {
  const dispatch = useDispatch();
  const { domains, status, error } = useSelector((state) => state.domains);
console.log("Domains:", domains); // Debugging line to check the domains data
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDomains());
    }
  }, [status, dispatch]);

  const [open, setOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const handleAddDomain = () => {
    setSelectedDomain(null); // Clear selected domain when adding
    setOpen(true);
  };

  const handleEditDomain = (domain) => {
    setSelectedDomain(domain); // Set selected domain when editing
    setOpen(true);
  };

  const handleDeleteDomain = (id) => {
    dispatch(deleteDomain(id))
      .unwrap()
      .then((deletedId) => {
        console.log(`Domain with ID ${deletedId} deleted successfully!`);
        toast.success("Domain deleted successfully!");
        dispatch(resetStatus());
      })
      .catch((error) => {
        console.error("Error deleting domain:", error);
        toast.error(`Error: ${error}`);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-12">
        <button
          onClick={handleAddDomain}
          className="bg-blue-500 text-white py-3 px-6 rounded-md flex items-center hover:bg-blue-600 text-sm font-semibold"
        >
          <PlusIcon className="h-6 w-6 mr-3" />
          Add new domain
        </button>
      </div>

      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <DomainCard
            key={domain._id}
            id={domain._id}
            domainName={domain.domainName}
            domainDescription={domain.domainDescription }
            domainProductOwner={domain.domainProductOwner}
            onEdit={() => handleEditDomain(domain)} // Pass domain to edit
            onDelete={() => handleDeleteDomain(domain._id)} // Pass domain ID to delete
          />
        ))}
      </div>

      <AddDomainDialog
        open={open}
        setOpen={setOpen}
        domain={selectedDomain} // Pass selected domain for editing
      />
    </div>
  );
};

export default ManageDomains;