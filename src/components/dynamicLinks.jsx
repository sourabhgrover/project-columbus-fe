import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'; // Importing the PlusIcon and TrashIcon

function DynamicLinks() {
    const [links, setLinks] = useState([{ linkType: '', link: '' }]);

    const handleAddLink = () => {
        setLinks([...links, { linkType: '', link: '' }]);
    };

    const handleDeleteLink = (index) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    return (
        <div>
            {links.map((link, index) => (
                <div key={index} className="col-span-full flex items-center space-x-4 mb-4"> {/* Added mb-4 for spacing */}
                    <div className="flex-1"> {/* Changed sm:col-span-4 to flex-1 */}
                        <label htmlFor={`link-type-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                            Link Type
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    type="text"
                                    name={`link-type-${index}`}
                                    id={`link-type-${index}`}
                                    className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Type"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1"> {/* Changed sm:col-span-4 to flex-1 */}
                        <label htmlFor={`website-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                            Website
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span>
                                <input
                                    type="text"
                                    name={`website-${index}`}
                                    id={`website-${index}`}
                                    className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="www.example.com"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center h-full mt-7"> {/* Align the delete button at the bottom */}
                        <button
                            type="button"
                            onClick={() => handleDeleteLink(index)}
                            className="rounded-md bg-red-600 p-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            <TrashIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            ))}

            <div className="col-span-full flex justify-end mt-4"> {/* Added mt-4 for spacing */}
                <button
                    type="button"
                    onClick={handleAddLink}
                    className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <PlusIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    <span className="ml-2">Add Link</span>
                </button>
            </div>
        </div>
    );
}

export default DynamicLinks;