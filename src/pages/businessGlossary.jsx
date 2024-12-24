// src/pages/BusinessGlossaryPage.jsx
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import GlossaryCard from "../components/GlossaryCard"; // Importing the separated GlossaryCard component
import AddBusinessGlossary from "./addBusinessGlossary";

const BusinessGlossaryPage = () => {
  // State for glossary items
  const [glossaries, setGlossaries] = useState([
    {
      title: "Plan and Delivery",
      description: "Strategic planning and execution for product delivery.",
    },
    {
      title: "Make and Quality",
      description: "Manufacturing processes and quality control procedures.",
    },
    {
      title: "Finance",
      description: "Financial management and budgeting operations.",
    },
    {
      title: "Supply Chain",
      description: "Logistics and supply chain management processes.",
    },
  ]);

  const [open, setOpen] = useState(false);

  // Handlers for user actions
  const handleAddGlossary = () => {
    setOpen(true)
    ;
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First row of glossary cards */}
        {glossaries.slice(0, 3).map((glossary, index) => (
          <GlossaryCard
            key={index}
            title={glossary.title}
            description={glossary.description}
          />
        ))}

        {/* Second row of glossary cards */}
        {glossaries.slice(3).map((glossary, index) => (
          <GlossaryCard
            key={index}
            title={glossary.title}
            description={glossary.description}
          />
        ))}
      </div>
      <AddBusinessGlossary open={open} setOpen={setOpen} />
    </div>
  );
};

export default BusinessGlossaryPage;
