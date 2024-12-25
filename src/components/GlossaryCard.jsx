import React from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const GlossaryCard = ({ id, title, description, imageUrl, onEdit, onDelete }) => {

  if (!title || !description) {
    console.error('GlossaryCard requires both title and description props.');
    return null;
  }

  // Handler for deleting glossary entry
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id); // Call the onDelete function passed from the parent component
    }
  };

  return (
    <div className="relative max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="h-32 w-full object-cover rounded-md mb-4"
        />
      )}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={handleDelete} />
      </div>
    </div>
  );
};

export default GlossaryCard;