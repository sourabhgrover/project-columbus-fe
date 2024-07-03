import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Charts = () => {
    const chartData = [
        {
            title: 'Number of Data Products',
            data: {
                labels: ['Data Products'],
                datasets: [{
                    label: 'Number of Data Products',
                    data: [50],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }],
            },
            type: Bar,
        },
        {
            title: 'Number of Sources',
            data: {
                labels: ['Sources'],
                datasets: [{
                    label: 'Number of Sources',
                    data: [30],
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                }],
            },
            type: Bar,
        },
        {
            title: 'Value in Euros Derived',
            data: {
                labels: ['Value (€)'],
                datasets: [{
                    label: 'Value in Euros',
                    data: [100000],
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                }],
            },
            type: Line,
        },
        {
            title: 'Business Terms',
            data: {
                labels: ['Total Terms', 'Approved Terms', 'Pending Approval'],
                datasets: [{
                    label: 'Business Terms',
                    data: [200, 150, 50],
                    backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
                    borderWidth: 1,
                }],
            },
            type: Doughnut,
        },
        {
            title: 'Number of DQ Checks',
            data: {
                labels: ['DQ Checks'],
                datasets: [{
                    label: 'Number of DQ Checks',
                    data: [120],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                }],
            },
            type: Bar,
        },
        {
            title: 'Active Data Contracts',
            data: {
                labels: ['Active Data Contracts'],
                datasets: [{
                    label: 'Active Data Contracts',
                    data: [10],
                    backgroundColor: 'rgba(255, 205, 86, 0.6)',
                    borderColor: 'rgba(255, 205, 86, 1)',
                    borderWidth: 1,
                }],
            },
            type: Bar,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {chartData.map((chart, index) => {
                const ChartComponent = chart.type;
                return (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">{chart.title}</h3>
                        <ChartComponent data={chart.data} />
                    </div>
                );
            })}
        </div>
    );
};

export default Charts;
