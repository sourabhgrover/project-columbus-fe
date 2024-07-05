import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

const GlossaryPage = () => {
  // Dummy data
  const dummyData = [
    {
      id: 1,
      termName: 'Account Management',
      description:
        'Account management involves the maintenance and nurturing of client relationships after a sale has been made.',
      status: 'Draft',
      owner: 'Effie Kilmer',
      ownerInitials: 'EK',
    },
    {
      id: 2,
      termName: 'Closing Deals',
      description:
        'The final stage of the sales process where the salesperson negotiates and secures a deal with the customer.',
      status: 'Draft',
      owner: 'Nick Doughty',
      ownerInitials: 'ND',
    },
    {
      id: 3,
      termName: 'Closing Techniques',
      description:
        'Closing techniques refer to various strategies and tactics used by salespeople to encourage customers to commit to a purchase.',
      status: 'Draft',
      owner: 'Effie Kilmer',
      ownerInitials: 'EK',
    },
    {
      id: 4,
      termName: 'CluedIn MDM',
      description: 'This glossary term is used for CluedIn integration.',
      status: 'Published',
      owner: 'Shafiq Manan',
      ownerInitials: 'SM',
    },
    {
      id: 5,
      termName: 'Consultative Sales',
      description:
        'Consultative sales is an approach where salespeople act as trusted advisors to their customers.',
      status: 'Draft',
      owner: 'Effie Kilmer',
      ownerInitials: 'EK',
    },
    {
      id: 6,
      termName: 'Customer Feedback',
      description:
        'A sales approach focused on understanding customer needs and providing tailored solutions.',
      status: 'Draft',
      owner: 'Nick Doughty',
      ownerInitials: 'ND',
    },
  ];

  const [glossaryTerms, setGlossaryTerms] = useState(dummyData);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <button className="bg-gray-200 text-gray-700 p-2 rounded-md flex items-center hover:bg-gray-300">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add new term
        </button>
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
          {glossaryTerms.map((term) => (
            <tr key={term.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {term.termName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {term.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {term.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500 text-white">
                  {term.ownerInitials}
                </span>
                <span>{term.owner}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">Showing {glossaryTerms.length} of {glossaryTerms.length}</span>
        <div className="flex space-x-2">
          <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300">
            Previous
          </button>
          <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlossaryPage;