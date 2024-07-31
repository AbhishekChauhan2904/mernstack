const express = require('express');
const { seedData } = require('../controllers/seedController');

const router = express.Router();

router.get('/', seedData);

module.exports = router;
