const axios = require('axios');
const Transaction = require('../models/Transaction');

const seedData = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(response.data);
    res.status(200).send('Database seeded');
  } catch (error) {
    res.status(500).send('Error seeding database');
  }
};

module.exports = {
  seedData,
};
