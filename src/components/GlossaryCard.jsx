import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { deleteGlossaryEntry } from '../rtk/businessGlossarySlice'; // Import the delete action

const GlossaryCard = ({ id, title, description, imageUrl, onEdit }) => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  if (!title || !description) {
    console.error('GlossaryCard requires both title and description props.');
    return null;
  }

  // Handler for deleting glossary entry
  const handleDelete = () => {
    dispatch(deleteGlossaryEntry(id)); // Dispatch the delete action with the entry's ID
  };

  return (
    <div className="relative max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-lg mb-10">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="h-32 w-full object-cover rounded-md mb-4"
        />
      )}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={handleDelete} /> {/* Use the handleDelete function */}
      </div>
    </div>
  );
};

export default GlossaryCard;