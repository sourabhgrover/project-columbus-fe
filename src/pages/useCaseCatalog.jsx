import React, { useState, useEffect } from 'react';
import { fetchUseCase } from '../rtk/useCase';
import { useDispatch, useSelector } from 'react-redux';

const UseCaseCatalog = () => {
  const [visibleUseCases, setVisibleUseCases] = useState(3); // Initial number of visible use cases
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.useCase);
  useEffect(() => {
    // Dispatch action to fetch data
    dispatch(fetchUseCase());
  }, [dispatch]);
  
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleViewMoreClick = () => {
    setVisibleUseCases((prevVisibleUseCases) => prevVisibleUseCases + 3); // Increase visible use cases by 3
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {data.slice(0, visibleUseCases).map((useCase) => (
          <div key={useCase?._id} className="bg-white shadow-lg rounded-lg p-4 border-t-4 border-blue-500">
            <img
              // src={useCase.displayPhoto}
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
              alt={useCase?.useCaseName}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{useCase?.useCaseName}</h3>
            <p className="text-sm text-gray-600 mb-2">€{useCase?.valueInEuros} of value delivered</p>
            <p className="text-sm text-gray-600 mb-2"><strong></strong> {truncateText(useCase?.businessValue, 100)}</p>
            <div className="flex justify-start mt-12"> {/* Align "View Details" button to the left */}
              <button className="bg-blue-600 text-white px-6 py-4 rounded-md hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {visibleUseCases < data.length && (
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

export default UseCaseCatalog;