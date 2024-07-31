import React from 'react';

const Statistics = ({ data }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sale: {data.totalSale}</p>
      <p>Total Sold: {data.totalSold}</p>
      <p>Total Not Sold: {data.totalNotSold}</p>
    </div>
  );
};

export default Statistics;
