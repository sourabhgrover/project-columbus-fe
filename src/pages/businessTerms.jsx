import React, { useEffect, useState } from "react";
import { PlusIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinessTerms, fetchBusinessTermsByGlossaryId } from "../rtk/addBusinessTerm";
import { writeFile, utils } from "xlsx";
import "react-resizable/css/styles.css"; // Import the styles for react-resizable

const BusinessTermsPage = () => {
  const { id } = useParams(); // Fetch the id from the URL
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.manageBusinessTerm);

  useEffect(() => {
    if (id) {
      // Dispatch action to fetch business terms based on the glossary id
      dispatch(fetchBusinessTermsByGlossaryId(id));
    }
  }, [dispatch, id]);

  const handleDownload = () => {
    const headers = ["Term Name", "Description", "Status"];
    const rows = data.map((term) => [
      term?.name,
      term?.definition,
      term?.status,
    ]);

    const worksheet = utils.aoa_to_sheet([headers, ...rows]);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Terms");

    writeFile(workbook, "GlossaryTerms.xlsx");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-2">
          <Link
            to={`/add-business-term/${id}`} // Pass the id to the add-business-term route
            className="bg-blue-500 text-white p-2 rounded-md flex items-center hover:bg-blue-600 text-xs"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add new term
          </Link>
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white p-2 rounded-md flex items-center hover:bg-blue-600 text-xs"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Download Terms
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-md flex items-center hover:bg-blue-600 text-xs"
          >
            <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
            Bulk Upload Terms
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                Term Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((term) => (
              <tr key={term._id} className="border-t border-gray-200">
                <td
                  className="px-6 py-4 text-sm font-medium text-gray-900"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Link to={`/business-glossary/${term._id}`}>{term?.name}</Link>
                </td>
                <td
                  className="px-6 py-4 text-sm text-gray-500"
                  style={{
                    whiteSpace: "normal",
                    overflow: "hidden",
                  }}
                >
                  {term?.definition}
                </td>
                <td
                  className="px-6 py-4 text-sm text-gray-500"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {term?.status || "Draft"} {/* Default value */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessTermsPage;