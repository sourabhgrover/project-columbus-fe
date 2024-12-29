import { PencilIcon, TrashIcon, ShareIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchBusinessTerms,
  deleteBusinessTerm,
  updateBusinessTerm,
  createBusinessTerm,
} from "../rtk/addBusinessTerm";
import { useEffect, useState } from "react";
import Alert from "../components/alerts"; // Import Alert component

export default function ViewBusinessTerm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionType, setActionType] = useState(""); // Action type: 'edit', 'create', 'delete'
  const [alert, setAlert] = useState(null); // State for showing alerts

  // Fetch business terms when component loads
  useEffect(() => {
    dispatch(fetchBusinessTerms());
  }, [dispatch]);

  const { data, loading, error } = useSelector(
    (state) => state.manageBusinessTerm
  );
  const selectedBusinessTerm = data.find((term) => term._id === id);

  // Update local state when a term is selected
  useEffect(() => {
    if (selectedBusinessTerm) {
      setFormData(selectedBusinessTerm);
      setOriginalData(selectedBusinessTerm);
      setActionType("edit"); // If selected, action is edit
    } else {
      setActionType("create"); // No term selected, so it's a create
    }
  }, [selectedBusinessTerm]);

  // Handle share functionality
  const handleShare = () => {
    const shareUrl = window.location.href; // Get the current URL (link to this business term)
    navigator.clipboard
      .writeText(shareUrl) // Copy the URL to clipboard
      .then(() => {
        setAlert({ message: "Business term URL copied to clipboard!", type: "info" });
      })
      .catch((err) => {
        setAlert({ message: "Failed to copy URL: " + err, type: "error" });
      });
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Assuming glossaryId is a property of the selectedBusinessTerm
  const glossaryId = selectedBusinessTerm?.glossaryId; // Replace with actual property name

  // Delete business term
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this business term?")) {
      setIsDeleting(true);
      try {
        await dispatch(deleteBusinessTerm(id)).unwrap();
        setAlert({ message: "Business term deleted successfully.", type: "success" });

        // After successful deletion, navigate back to the glossary page with glossaryId
        if (glossaryId) {
          navigate(`/business-terms/${glossaryId}`); // Navigate to the specific glossary's page
        } else {
          navigate("/business-terms"); // Default if no glossaryId is found
        }
      } catch (error) {
        setAlert({ message: "Failed to delete business term. Please try again.", type: "error" });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Toggle edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setFormData(originalData);
  };

  // Cancel edit mode
  const handleCancel = () => {
    setIsEditing(false);
    setFormData(originalData);
  };

  // Save updated or create new business term
  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (actionType === "create") {
        await dispatch(createBusinessTerm(formData)).unwrap();
        setAlert({ message: "Business term created successfully.", type: "success" });
      } else if (actionType === "edit") {
        await dispatch(
          updateBusinessTerm({ id, updatedData: formData })
        ).unwrap();
        setAlert({ message: "Business term updated successfully.", type: "success" });
        setOriginalData(formData);
      }

      // Refetch the latest business terms after saving
      dispatch(fetchBusinessTerms());

      setIsEditing(false);
    } catch (error) {
      setAlert({ message: "Failed to save business term. Please try again.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div>Loading business term details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedBusinessTerm && actionType !== "create") {
    return <div>Business term not found.</div>;
  }

  return (
    <div>
      {/* Alert */}
      {alert && <Alert message={alert.message} type={alert.type} />}

      <div className="px-4 sm:px-0">
        <h3 className="text-2xl font-bold leading-7 text-gray-600 flex items-center">
          {actionType === "create" ? (
            "Create New Business Term"
          ) : (
            <>
              {selectedBusinessTerm?.name}
              {/* Share Icon */}
              <button
                onClick={handleShare}
                className="ml-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <ShareIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {/* Name Input */}
          <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium text-gray-900">Name</dt>
            <dd className="text-sm text-gray-700 sm:col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                selectedBusinessTerm?.name
              )}
            </dd>
          </div>

          {/* Definition Input */}
          <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium text-gray-900">Definition</dt>
            <dd className="text-sm text-gray-700 sm:col-span-2">
              {isEditing ? (
                <textarea
                  name="definition"
                  value={formData.definition || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  rows={4}
                />
              ) : (
                selectedBusinessTerm?.definition
              )}
            </dd>
          </div>

          {/* Parent Term Input */}
          <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium text-gray-900">Parent Term</dt>
            <dd className="text-sm text-gray-700 sm:col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  name="parentTerm"
                  value={formData.parentTerm || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                selectedBusinessTerm?.parentTerm
              )}
            </dd>
          </div>

          {/* Owner Input */}
          <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium text-gray-900">Owner</dt>
            <dd className="text-sm text-gray-700 sm:col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  name="owner"
                  value={formData.owner || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                selectedBusinessTerm?.owner.firstName
              )}
            </dd>
          </div>

          {/* Status Input */}
          <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium text-gray-900">Status</dt>
            <dd className="text-sm text-gray-700 sm:col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  name="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                selectedBusinessTerm?.status
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* Action buttons */}
      <div className="space-x-4 mt-6 flex justify-start">
        {!isEditing && actionType !== "create" && (
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PencilIcon className="h-5 w-5 mr-2 inline" />
            Edit
          </button>
        )}
        {isEditing && (
          <>
            <button
              onClick={handleSave}
              className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                isSaving ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSaving}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </>
        )}
        {actionType !== "create" && (
          <button
            onClick={handleDelete}
            className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isDeleting}
          >
            <TrashIcon className="h-5 w-5 mr-2 inline" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}