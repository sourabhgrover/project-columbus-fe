import React, { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchemas } from "../rtk/schemas";
import { Link } from "react-router-dom";
import { updateSchema } from "../rtk/schemaDetails";
import "react-resizable/css/styles.css"; // Import the styles for react-resizable

const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const SourceSystems = () => {
  const dispatch = useDispatch();
  const schemaDataset = useSelector((state) => state.schemas);
  const { success } = useSelector((state) => state.schemaDetails);

  // Fetch Schemas
  useEffect(() => {
    dispatch(fetchSchemas());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setEditIndex(null);
      setEditedSource({});
      dispatch(fetchSchemas());
    }
  }, [success]);

  useEffect(() => {
    setSources(schemaDataset.schemas);
  }, [schemaDataset]);

  const [sources, setSources] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedSource, setEditedSource] = useState({});
  const [visibleSources, setVisibleSources] = useState(6); // Initial number of visible sources

  const handleEditClick = (sourceId) => {
    setEditIndex(sourceId);
    let editedSource = sources.find((source) => source._id === sourceId);
    // Create edited source object
    const editedSourceObject = {
      name: editedSource?.customSchema?.name || editedSource?.name,
      type: editedSource?.customSchema?.type || "",
      status: editedSource?.customSchema?.status || "",
      domain: editedSource?.customSchema?.domain || "",
      comment:
        editedSource?.customSchema?.comment || editedSource?.comment || "",
    };
    // setEditedSource(sources[index]);
    setEditedSource(editedSourceObject);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSource((prevSource) => ({
      ...prevSource,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    editedSource._id = editIndex;
    dispatch(updateSchema(editedSource));
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
          <div
            key={source.id}
            className="bg-white shadow-lg rounded-lg p-6 border-t-4"
            style={{
              borderTopColor: source?.customSchema?.status === "Active" ? "green" : "red",
              minWidth: "300px",
            }}
          >
            {editIndex === source._id ? (
              <div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editedSource?.name}
                    onChange={handleInputChange}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={editedSource?.type}
                    onChange={handleInputChange}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editedSource?.status}
                    onChange={handleInputChange}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Domain
                  </label>
                  <input
                    type="text"
                    name="domain"
                    value={editedSource?.domain}
                    onChange={handleInputChange}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="comment"
                    value={editedSource?.comment}
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
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      {source?.customSchema?.name || source?.name}
                    </h3>
                    <p className="text-sm mb-1 text-gray-700">
                      <strong>Type:</strong> {source?.customSchema?.type}
                    </p>
                    <p className="text-sm mb-1 text-gray-700">
                      <strong>Status:</strong> {source?.customSchema?.status}
                    </p>
                    <p className="text-sm mb-1 text-gray-700">
                      <strong>Domain:</strong> {source?.customSchema?.domain}
                    </p>
                    <p className="text-sm mb-1 text-gray-700">
                      <strong>Number of Objects:</strong> {source.objects}
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                      {truncateText(source?.customSchema?.comment || source?.comment, 200)}
                    </p>
                  </div>
                  <button
                    // onClick={() => handleEditClick(index)}
                    onClick={() => handleEditClick(source._id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </div>

                <Link
                  to={`/source-system/${source._id}`}
                  className="mt-auto bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View More
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      {visibleSources < sources.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleViewMoreClick}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default SourceSystems;