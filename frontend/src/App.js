import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [month, setMonth] = useState('07'); // Default to July

  useEffect(() => {
    const fetchData = async () => {
      const transactionsResponse = await axios.get(`/api/transactions?month=${month}`);
      setTransactions(transactionsResponse.data);

      const statisticsResponse = await axios.get(`/api/statistics?month=${month}`);
      setStatistics(statisticsResponse.data);

      const barChartResponse = await axios.get(`/api/bar-chart?month=${month}`);
      setBarChartData(barChartResponse.data);

      const pieChartResponse = await axios.get(`/api/pie-chart?month=${month}`);
      setPieChartData(pieChartResponse.data);
    };

    fetchData();
  }, [month]);

  return (
    <div>
      <h1>Transaction Dashboard</h1>
      <select onChange={(e) => setMonth(e.target.value)} value={month}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <Statistics data={statistics} />
      <BarChart data={barChartData} />
      <PieChart data={pieChartData} />
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default App;
