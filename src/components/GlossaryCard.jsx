// src/components/GlossaryCard.jsx
import React from 'react';

const GlossaryCard = ({ title, description, imageUrl }) => {
  if (!title || !description) {
    console.error('GlossaryCard requires both title and description props.');
    return null;
  }

  return (
    <div className="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="h-32 w-full object-cover rounded-md mb-4" />
      )}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default GlossaryCard;