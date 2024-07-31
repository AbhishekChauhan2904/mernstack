import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.range),
    datasets: [
      {
        label: 'Price Ranges',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
