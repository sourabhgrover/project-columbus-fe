import React, { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';

const dummySources = [
    {
        id: 1,
        name: 'Source System 1',
        description: 'A reliable database system that stores critical information for our applications. It is highly scalable and secure, ensuring data integrity at all times.',
        type: 'Database',
        status: 'Active',
        domain: 'Finance',
        objects: 256,
    },
    {
        id: 2,
        name: 'Source System 2',
        description: 'An API source that integrates seamlessly with various services, providing real-time data exchange and robust performance.',
        type: 'API',
        status: 'Inactive',
        domain: 'HR',
        objects: 123,
    },
    {
        id: 3,
        name: 'Source System 3',
        description: 'A file system that manages a large volume of data files efficiently. It supports various file formats and ensures fast access and retrieval.',
        type: 'File System',
        status: 'Active',
        domain: 'Supply Chain',
        objects: 512,
    },
    {
        id: 4,
        name: 'Source System 4',
        description: 'A data lake that aggregates data from multiple sources, offering deep insights and advanced analytics capabilities.',
        type: 'Data Lake',
        status: 'Active',
        domain: 'R&D',
        objects: 1024,
    },
    {
        id: 5,
        name: 'Source System 5',
        description: 'A data lake that aggregates data from multiple sources, offering deep insights and advanced analytics capabilities.',
        type: 'Data Lake',
        status: 'Active',
        domain: 'R&D',
        objects: 1024,
    },
    {
        id: 6,
        name: 'Source System 6',
        description: 'A data lake that aggregates data from multiple sources, offering deep insights and advanced analytics capabilities.',
        type: 'Data Lake',
        status: 'Active',
        domain: 'R&D',
        objects: 1024,
    },
    {
        id: 7,
        name: 'Source System 7',
        description: 'A data lake that aggregates data from multiple sources, offering deep insights and advanced analytics capabilities.',
        type: 'Data Lake',
        status: 'Active',
        domain: 'R&D',
        objects: 1024,
    },
    {
        id: 8,
        name: 'Source System 8',
        description: 'A data lake that aggregates data from multiple sources, offering deep insights and advanced analytics capabilities.',
        type: 'Data Lake',
        status: 'Active',
        domain: 'R&D',
        objects: 1024,
    },
    // Add more dummy sources as needed
];

const SourceSystems = () => {
    const [sources, setSources] = useState(dummySources);
    const [editIndex, setEditIndex] = useState(null);
    const [editedSource, setEditedSource] = useState({});
    const [visibleSources, setVisibleSources] = useState(6); // Initial number of visible sources

    const handleEditClick = (index) => {
        setEditIndex(index);
        setEditedSource(sources[index]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedSource((prevSource) => ({
            ...prevSource,
            [name]: value,
        }));
    };

    const handleSaveClick = () => {
        const updatedSources = [...sources];
        updatedSources[editIndex] = editedSource;
        setSources(updatedSources);
        setEditIndex(null);
    };

    const handleCancelClick = () => {
        setEditIndex(null);
    };

    const handleViewMoreClick = () => {
        setVisibleSources((prevVisibleSources) => prevVisibleSources + 6); // Increase visible sources by 6
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Source Systems</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {sources.slice(0, visibleSources).map((source, index) => (
                    <div key={source.id} className="bg-white shadow-lg rounded-lg p-6 border-t-4" style={{ borderTopColor: source.status === 'Active' ? 'green' : 'red', minWidth: '300px' }}>
                        {editIndex === index ? (
                            <div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedSource.name}
                                        onChange={handleInputChange}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Type</label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={editedSource.type}
                                        onChange={handleInputChange}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        name="status"
                                        value={editedSource.status}
                                        onChange={handleInputChange}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Domain</label>
                                    <input
                                        type="text"
                                        name="domain"
                                        value={editedSource.domain}
                                        onChange={handleInputChange}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={editedSource.description}
                                        onChange={handleInputChange}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        onClick={handleSaveClick}
                                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelClick}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900">{source.name}</h3>
                                        <p className="text-sm mb-1 text-gray-700"><strong>Type:</strong> {source.type}</p>
                                        <p className="text-sm mb-1 text-gray-700"><strong>Status:</strong> {source.status}</p>
                                        <p className="text-sm mb-1 text-gray-700"><strong>Domain:</strong> {source.domain}</p>
                                        <p className="text-sm mb-1 text-gray-700"><strong>Number of Objects:</strong> {source.objects}</p>
                                        <p className="text-sm text-gray-700 mb-4">{source.description}</p>
                                    </div>
                                    <button onClick={() => handleEditClick(index)} className="text-gray-500 hover:text-gray-700">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                </div>
                                <button className="mt-auto bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    View More
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {visibleSources < sources.length && (
                <div className="flex justify-center mt-4">
                    <button onClick={handleViewMoreClick} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        View More
                    </button>
                </div>
            )}
        </div>
    );
};

export default SourceSystems;