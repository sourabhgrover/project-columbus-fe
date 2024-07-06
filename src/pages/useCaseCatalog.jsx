import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchUseCase } from '../rtk/useCase';
import { useDispatch, useSelector } from 'react-redux';

const UseCaseCatalog = () => {
  const [useCases, setUseCases] = useState([]);
  const [visibleUseCases, setVisibleUseCases] = useState(3); // Initial number of visible use cases
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.useCase);
  useEffect(() => {
    // Dispatch action to fetch data
    dispatch(fetchUseCase());
  }, []);
  // useEffect(() => {
  //   // Fetch the use cases from the backend
  //   // Replace this with the actual backend API call when available
  //   const fetchData = async () => {
  //     // Dummy data for illustration
  //     const dummyData = [
  //       {
  //         _id: '1',
  //         useCaseType: 'Predictive Analytics',
  //         useCaseName: 'Customer Churn Prediction',
  //         displayPhoto: 'https://images.unsplash.com/photo-1556761175-4b46a572b786',
  //         businessValue: 'Reduces churn rate by 15%',
  //       },
  //       {
  //         _id: '2',
  //         useCaseType: 'Data Visualization',
  //         useCaseName: 'Sales Performance Dashboard',
  //         displayPhoto: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
  //         businessValue: 'Improves sales insights by 20%',
  //       },
  //       {
  //         _id: '3',
  //         useCaseType: 'Machine Learning',
  //         useCaseName: 'Image Recognition System',
  //         displayPhoto: 'https://images.unsplash.com/photo-1542744095-291d1f67b221',
  //         businessValue: 'Increases accuracy by 25%',
  //       },
  //       {
  //         _id: '4',
  //         useCaseType: 'Natural Language Processing',
  //         useCaseName: 'Sentiment Analysis Tool',
  //         displayPhoto: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  //         businessValue: 'Enhances customer feedback analysis',
  //       },
  //       {
  //         _id: '5',
  //         useCaseType: 'Big Data',
  //         useCaseName: 'Real-time Analytics',
  //         displayPhoto: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4',
  //         businessValue: 'Speeds up data processing by 30%',
  //       },
  //       {
  //         _id: '6',
  //         useCaseType: 'Business Intelligence',
  //         useCaseName: 'Financial Reporting',
  //         displayPhoto: 'https://images.unsplash.com/photo-1557425493-6f90ae4659fc',
  //         businessValue: 'Streamlines financial reporting',
  //       },
  //     ];

  //     // Simulate an API call
  //     setUseCases(dummyData);
  //   };

  //   fetchData();
  // }, []);

  const handleViewMoreClick = () => {
    setVisibleUseCases((prevVisibleUseCases) => prevVisibleUseCases + 3); // Increase visible use cases by 3
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Use Case Catalog</h2>
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
            <p className="text-sm text-gray-600 mb-2">{useCase?.useCaseType}</p>
            <p className="text-sm text-gray-600 mb-2"><strong></strong> {useCase.businessValue}</p>
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