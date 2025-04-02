import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { deleteDomain } from '../rtk/domainSlice'; // Import the delete action for domains
import { Link } from 'react-router-dom';

const DomainCard = ({ id, domainName, domainDescription, imageUrl, onEdit, domainProductOwner }) => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  if (!domainName) {
    console.error('DomainCard requires both domainName and domainDescription props.');
    return null;
  }

  // Handler for deleting domain entry
  const handleDelete = () => {
    dispatch(deleteDomain(id)); // Dispatch the delete action with the entry's ID
  };

  return (
    <div className="relative max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-lg mb-10">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={domainName}
          className="h-32 w-full object-cover rounded-md mb-4"
        />
      )}
      <div className="mb-8">
        <Link to={`/domain-details/${id}`}>
          <h3 className="text-xl font-semibold text-blue-600">{domainName}</h3>
        </Link>
        <p className="mt-2 text-gray-600">{domainDescription}</p>
        {domainProductOwner && (
          <p className="mt-2 text-gray-500 text-sm">Product Owner: {domainProductOwner}</p>
        )}
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={handleDelete} /> {/* Use the handleDelete function */}
      </div>
    </div>
  );
};

export default DomainCard;