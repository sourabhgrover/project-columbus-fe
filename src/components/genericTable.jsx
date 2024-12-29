import React, { useState } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css"; // Import the styles for react-resizable

const GenericTable = ({ data, columns, handleCheckboxChange, selectedTerms = [] }) => {  // Set default value for selectedTerms
  const [widths, setWidths] = useState(
    columns.reduce((acc, column) => {
      acc[column.key] = 200; // Initial width for each column
      return acc;
    }, {})
  );

  const handleResize =
    (header) =>
    (e, { size }) => {
      setWidths((prevWidths) => ({
        ...prevWidths,
        [header]: size.width,
      }));
    };

  return (
    <table className="min-w-full divide-y divide-gray-200 text-xs">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
            {/* Checkbox Header */}
          </th>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              <Resizable
                width={widths[column.key]}
                height={20}
                axis="x"
                resizeHandles={["e"]}
                onResize={handleResize(column.key)}
                minConstraints={[50, 20]}
                maxConstraints={[500, 20]}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    height: "100%",
                    paddingRight: 6,
                  }}
                >
                  {column.label}
                </div>
              </Resizable>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item._id}>
            {/* Checkbox Column on the Left */}
            <td className="px-6 py-4 text-sm text-gray-500">
              <input
                type="checkbox"
                checked={selectedTerms.includes(item._id)}  // Safely check if the term is selected
                onChange={() => handleCheckboxChange(item._id)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </td>
            {/* Render the actual table data */}
            {columns.map((column) => (
              <td key={column.key} className="px-6 py-4 text-sm text-gray-500">
                {column.render ? column.render(item) : item[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;