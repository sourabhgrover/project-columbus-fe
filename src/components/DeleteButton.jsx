import React from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';

const DeleteButton = ({ onClick }) => {
  return (
    <button
      className="text-red-500 hover:text-red-600 focus:outline-none"
      onClick={onClick}
    >
      <TrashIcon className="h-5 w-5" aria-hidden="true" /> {/* Reduced size */}
    </button>
  );
};

export default DeleteButton;