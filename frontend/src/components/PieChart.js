import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Category Distribution',
        data: data.map(item => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
