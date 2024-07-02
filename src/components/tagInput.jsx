import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className="flex flex-wrap items-center border border-gray-300 rounded-md p-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="flex items-center m-1 px-3 py-0.5 bg-gray-200 rounded-full text-sm font-medium text-gray-800"
        >
          {tag}
          <XMarkIcon
            className="ml-2 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={() => handleRemoveTag(tag)}
          />
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 border-none focus:ring-0 text-sm leading-6"
        placeholder="Add a tag"
      />
    </div>
  );
};

export default TagInput;
