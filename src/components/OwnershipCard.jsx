import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { deleteOwnership } from '../rtk/ownerShipSlice'; // Import the delete action
import { Link } from 'react-router-dom';

const OwnershipCard = ({ id, name, description, imageUrl, onEdit }) => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  if (!name) {
    console.error('OwnershipCard requires both ownerName and role props.');
    return null;
  }

  // Handler for deleting ownership entry
  const handleDelete = () => {
    dispatch(deleteOwnership(id)); // Dispatch the delete action with the entry's ID
  };

  return (
    <div className="relative max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-lg mb-10">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="h-32 w-full object-cover rounded-md mb-4"
        />
      )}
      <div className="mb-8">
        <Link to={`/ownership-details/${id}`}>
          <h3 className="text-xl font-semibold text-blue-600">{name}</h3>
        </Link>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={handleDelete} /> {/* Use the handleDelete function */}
      </div>
    </div>
  );
};

export default OwnershipCard;