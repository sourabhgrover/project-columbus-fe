import React from 'react';
import { PencilIcon } from '@heroicons/react/20/solid';

const EditButton = ({ onClick }) => {
  return (
    <button
      className="text-gray-500 hover:text-gray-700 focus:outline-none"
      onClick={onClick}
    >
      <PencilIcon className="h-5 w-5" aria-hidden="true" /> {/* Reduced size */}
    </button>
  );
};

export default EditButton;