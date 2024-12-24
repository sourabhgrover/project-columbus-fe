// src/components/AddGlossaryButton.jsx
import React from 'react';

const AddGlossaryButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center bg-sky-500 text-white rounded-full w-14 h-14 shadow-lg hover:bg-sky-600 transition duration-300 ease-in-out"
    >
      <span className="sr-only">Add New Glossary</span> {/* For accessibility */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 5v14M5 12h14"
        />
      </svg>
    </button>
  );
};

export default AddGlossaryButton;