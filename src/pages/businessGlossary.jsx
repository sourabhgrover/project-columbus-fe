// src/pages/BusinessGlossaryPage.jsx
import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import GlossaryCard from "../components/GlossaryCard"; // Importing the separated GlossaryCard component
import AddBusinessGlossary from "./addBusinessGlossary";
import { fetchGlossaryEntries } from "../rtk/businessGlossarySlice";
import { fetchDomains } from "../rtk/domainSlice";

const BusinessGlossaryPage = () => {
  const dispatch = useDispatch();
  const { entries, fetchStatus, error } = useSelector(
    (state) => state.businessGlossary
  );
  const {  status: domainStatus } = useSelector((state) => state.domains);
  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchGlossaryEntries());
    }
  }, [fetchStatus, dispatch]);
  
  useEffect(() => {
    if (domainStatus === 'idle') {
      dispatch(fetchDomains());
    }
  }, [domainStatus, dispatch]);

  const [open, setOpen] = useState(false);

  // Handlers for user actions
  const handleAddGlossary = () => {
    setOpen(true);
  };

  const handleDownload = () => {
    console.log("Download Terms functionality!");
    alert("Download Terms!");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-12">
        <div className="flex space-x-2">
          <button
            onClick={handleAddGlossary}
            className="bg-blue-500 text-white py-3 px-6 rounded-md flex items-center hover:bg-blue-600 text-sm font-semibold"
          >
            <PlusIcon className="h-6 w-6 mr-3" />
            Add new glossary
          </button>
        </div>
      </div>
      {fetchStatus === "loading" && <div>Loading...</div>}
      {fetchStatus === "failed" && <div>{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((glossary) => (
          <GlossaryCard
            key={glossary._id}
            title={glossary.glossaryName}
            description={glossary.dataSteward}
          />
        ))}
      </div>
      <AddBusinessGlossary open={open} setOpen={setOpen} />
    </div>
  );
};

export default BusinessGlossaryPage;
