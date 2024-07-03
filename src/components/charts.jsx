import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Tooltip, Legend, ArcElement, BarElement, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Tooltip, Legend, ArcElement, BarElement, CategoryScale);

function Home() {
  const numberOfDataProducts = 45;
  const totalValueDerived = 130000; // Placeholder for aggregate total value derived
  const numberOfBusinessTerms = {
    total: 100,
    approved: 70,
    pending: 30,
  };

  const valueInEurosData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Value in Euros',
        data: [12000, 15000, 18000, 20000, 22000, 24000],
        borderColor: 'rgba(54, 162, 235, 0.6)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const activeDataContractsData = {
    labels: ['Active', 'Inactive', 'Pending'],
    datasets: [
      {
        label: '# of Contracts',
        data: [50, 20, 30],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  const dataProductsPerDomainData = {
    labels: ['Procurement', 'HR', 'Supply Chain', 'Finance and Commerce'],
    datasets: [
      {
        label: 'Number of Data Products',
        data: [15, 10, 20, 8], // Dummy data for number of data products per domain
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',   // Red for Procurement
          'rgba(54, 162, 235, 0.6)',   // Blue for HR
          'rgba(255, 206, 86, 0.6)',   // Yellow for Supply Chain
          'rgba(75, 192, 192, 0.6)',   // Teal for Finance and Commerce
        ],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Number of Data Products */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Number of Data Products
          </div>
          <div className="text-4xl font-bold text-blue-500">{numberOfDataProducts}</div>
        </div>

        {/* Total Value Derived */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Total Value Derived (Monthly)
          </div>
          <div className="text-4xl font-bold text-blue-500">{totalValueDerived} €</div>
        </div>

        {/* Number of Business Terms */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center space-y-4">
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Number of Business Terms
          </div>
          <div className="text-2xl font-bold text-green-500">{numberOfBusinessTerms.approved} Approved</div>
          <div className="text-2xl font-bold text-yellow-500">{numberOfBusinessTerms.pending} Pending</div>
          <div className="text-2xl font-bold text-gray-500">{numberOfBusinessTerms.total} Total</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Value in Euros Derived by Using Data Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Value in Euros Derived by Using Data Products</h3>
          <div className="h-80">
            <Line data={valueInEurosData} />
          </div>
        </div>

        {/* Active Data Contracts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Active Data Contracts</h3>
          <div className="h-80">
            <Pie data={activeDataContractsData} />
          </div>
        </div>

        {/* Number of Data Products per Domain */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Number of Data Products per Domain</h3>
          <div className="h-80">
            <Bar data={dataProductsPerDomainData} options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;