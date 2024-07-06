import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinessTerms } from "../rtk/addBusinessTerm";

const GlossaryPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.manageBusinessTerm);

  useEffect(() => {
    // Dispatch action to fetch data
    dispatch(fetchBusinessTerms());
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/add-business-term"
          className="bg-gray-200 text-gray-700 p-2 rounded-md flex items-center hover:bg-gray-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add new term
        </Link>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Glossary Term Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Owner
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((term) => (
            <tr key={term._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {term?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {term?.definition}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {term?.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2">
                {/* <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500 text-white">
                  {term?.owner?.firstName}
                </span> */}
                <span>
                  {term?.owner?.firstName} {term?.owner?.lastName}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* HIDE PAGINATION WILL IMPLEMENT LATER ON */}
      {/* <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">Showing {glossaryTerms.length} of {glossaryTerms.length}</span>
        <div className="flex space-x-2">
          <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300">
            Previous
          </button>
          <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300">
            Next
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default GlossaryPage;
