import { useEffect, useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"; // Importing the PlusIcon and TrashIcon

function DynamicAttributes({name,setValue}) {
  const [custAttr, setcustAttr] = useState([{ attrName: "", attrDesc: "" }]);

  const handleAddAttr = () => {
    setcustAttr([...custAttr, { attrName: "", attrDesc: "" }]);
  };

  const handleDelAttr = (index) => {
    setcustAttr(custAttr.filter((_, i) => i !== index));
  };

    // Function to handle changes to any of the link inputs or link types
    const handleInputChange = (index, field, value) => {
      // Update the corresponding field in the object at the given index
      const updatedAttr = custAttr.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      });
      setcustAttr(updatedAttr);
    };

  useEffect(() => {
    setValue(name, custAttr)
  }, [custAttr])
  

  return (
    <div>
      {custAttr.map((link, index) => (
        <div
          key={index}
          className="col-span-full flex items-center space-x-4 mb-4"
        >
          {" "}
          {/* Added mb-4 for spacing */}
          <div className="flex-1">
            {" "}
            {/* Changed sm:col-span-4 to flex-1 */}
            <label
              htmlFor={`attr-name-${index}`}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Custom Attribute
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <input
                  type="text"
                  name={`attr-name-${index}`}
                  id={`attr-name-${index}`}
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Add a custom attribute for the Business Term"
                  onChange={(e) => handleInputChange(index, 'attrName', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            {" "}
            {/* Changed sm:col-span-4 to flex-1 */}
            <label
              htmlFor={`attrDesc-${index}`}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Attribute Details
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  
                </span>
                <input
                  type="text"
                  name={`attrDesc-${index}`}
                  id={`attrDesc-${index}`}
                  className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Add details for the custom attribute"
                  onChange={(e) => handleInputChange(index, 'attrDesc', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center h-full mt-7">
            {" "}
            {/* Align the delete button at the bottom */}
            <button
              type="button"
              onClick={() => handleDelAttr(index)}
              className="rounded-md bg-red-600 p-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <TrashIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      ))}

      <div className="col-span-full flex justify-end mt-4">
        {" "}
        {/* Added mt-4 for spacing */}
        <button
          type="button"
          onClick={handleAddAttr}
          className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-5 w-5 text-white" aria-hidden="true" />
          <span className="ml-2">Add Link</span>
        </button>
      </div>
    </div>
  );
}

export default DynamicAttributes;
