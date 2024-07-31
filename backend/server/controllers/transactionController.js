const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = '', month } = req.query;
  const query = { dateOfSale: { $regex: new RegExp(`-${month}-`) } };
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { price: Number(search) },
    ];
  }
  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(Number(perPage));
  res.json(transactions);
};

const getStatistics = async (req, res) => {
  const { month } = req.query;
  const transactions = await Transaction.find({ dateOfSale: { $regex: new RegExp(`-${month}-`) } });
  const totalSale = transactions.reduce((sum, transaction) => sum + transaction.price, 0);
  const totalSold = transactions.filter(transaction => transaction.sold).length;
  const totalNotSold = transactions.length - totalSold;
  res.json({ totalSale, totalSold, totalNotSold });
};

const getBarChartData = async (req, res) => {
  const { month } = req.query;
  const transactions = await Transaction.find({ dateOfSale: { $regex: new RegExp(`-${month}-`) } });
  const priceRanges = [
    { range: '0-100', count: 0 },
    { range: '101-200', count: 0 },
    { range: '201-300', count: 0 },
    { range: '301-400', count: 0 },
    { range: '401-500', count: 0 },
    { range: '501-600', count: 0 },
    { range: '601-700', count: 0 },
    { range: '701-800', count: 0 },
    { range: '801-900', count: 0 },
    { range: '901-above', count: 0 },
  ];

  transactions.forEach(transaction => {
    const price = transaction.price;
    if (price <= 100) priceRanges[0].count++;
    else if (price <= 200) priceRanges[1].count++;
    else if (price <= 300) priceRanges[2].count++;
    else if (price <= 400) priceRanges[3].count++;
    else if (price <= 500) priceRanges[4].count++;
    else if (price <= 600) priceRanges[5].count++;
    else if (price <= 700) priceRanges[6].count++;
    else if (price <= 800) priceRanges[7].count++;
    else if (price <= 900) priceRanges[8].count++;
    else priceRanges[9].count++;
  });

  res.json(priceRanges);
};

const getPieChartData = async (req, res) => {
  const { month } = req.query;
  const transactions = await Transaction.aggregate([
    { $match: { dateOfSale: { $regex: new RegExp(`-${month}-`) } } },
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);
  res.json(transactions);
};

module.exports = {
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
};
