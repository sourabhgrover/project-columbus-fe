import React, { useEffect, useState } from "react";
import { Resizable } from "react-resizable";
import { PlusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinessTerms } from "../rtk/addBusinessTerm";
import { writeFile, utils } from "xlsx";
import "react-resizable/css/styles.css"; // Import the styles for react-resizable

const GlossaryPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.manageBusinessTerm);
  const [widths, setWidths] = useState({
    name: 200,
    description: 300,
    status: 150,
    owner: 200,
  });

  useEffect(() => {
    // Dispatch action to fetch data
    dispatch(fetchBusinessTerms());
  }, [dispatch]);

  const handleResize =
    (header) =>
    (e, { size }) => {
      setWidths((prevWidths) => ({
        ...prevWidths,
        [header]: size.width,
      }));
    };

  const resizeHandle = (
    <div
      style={{
        width: 4,
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        cursor: "col-resize",
        position: "absolute",
        right: 0,
        top: 0,
      }}
    />
  );

  const handleDownload = () => {
    const headers = ["Glossary Term Name", "Description", "Status", "Owner"];
    const rows = data.map((term) => [
      term?.name,
      term?.definition,
      term?.status,
      `${term?.owner?.firstName || ""} ${term?.owner?.lastName || ""}`,
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
            to="/add-business-term"
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
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200 text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              <Resizable
                width={widths.name}
                height={20}
                axis="x"
                resizeHandles={["e"]}
                onResize={handleResize("name")}
                minConstraints={[50, 20]}
                maxConstraints={[500, 20]}
                handle={
                  <div
                    style={{
                      width: 4,
                      height: "100%",
                      cursor: "col-resize",
                      backgroundColor: "transparent",
                      position: "absolute",
                      right: 0,
                      top: 0,
                    }}
                  />
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Glossary Term Name
                  </div>
                  {resizeHandle}
                </div>
              </Resizable>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              <Resizable
                width={widths.description}
                height={20}
                axis="x"
                resizeHandles={["e"]}
                onResize={handleResize("description")}
                minConstraints={[100, 20]}
                maxConstraints={[800, 20]}
                handle={
                  <div
                    style={{
                      width: 4,
                      height: "100%",
                      cursor: "col-resize",
                      backgroundColor: "transparent",
                      position: "absolute",
                      right: 0,
                      top: 0,
                    }}
                  />
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <div style={{ whiteSpace: "normal", overflow: "hidden" }}>
                    Description
                  </div>
                  {resizeHandle}
                </div>
              </Resizable>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              <Resizable
                width={widths.status}
                height={20}
                axis="x"
                resizeHandles={["e"]}
                onResize={handleResize("status")}
                minConstraints={[50, 20]}
                maxConstraints={[300, 20]}
                handle={
                  <div
                    style={{
                      width: 4,
                      height: "100%",
                      cursor: "col-resize",
                      backgroundColor: "transparent",
                      position: "absolute",
                      right: 0,
                      top: 0,
                    }}
                  />
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Status
                  </div>
                  {resizeHandle}
                </div>
              </Resizable>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              <Resizable
                width={widths.owner}
                height={20}
                axis="x"
                resizeHandles={["e"]}
                onResize={handleResize("owner")}
                minConstraints={[50, 20]}
                maxConstraints={[300, 20]}
                handle={
                  <div
                    style={{
                      width: 4,
                      height: "100%",
                      cursor: "col-resize",
                      backgroundColor: "transparent",
                      position: "absolute",
                      right: 0,
                      top: 0,
                    }}
                  />
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Owner
                  </div>
                  {resizeHandle}
                </div>
              </Resizable>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((term) => (
            <tr key={term._id}>
              <td
                className="px-6 py-4 text-sm font-medium text-gray-900"
                style={{
                  width: widths.name,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {term?.name}
              </td>
              <td
                className="px-6 py-4 text-sm text-gray-500"
                style={{
                  width: widths.description,
                  whiteSpace: "normal",
                  overflow: "hidden",
                }}
              >
                {term?.definition}
              </td>
              <td
                className="px-6 py-4 text-sm text-gray-500"
                style={{
                  width: widths.status,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {term?.status || "Draft"} {/* Default value */}
              </td>
              <td
                className="px-6 py-4 text-sm text-gray-500"
                style={{
                  width: widths.owner,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {term?.owner?.firstName} {term?.owner?.lastName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GlossaryPage;
