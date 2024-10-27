const express = require('express');
const { searchDestinations } = require('../controllers/destinationSearchController');

const destinationsRouter = express.Router();

destinationsRouter.post('/search', searchDestinations);

module.exports = destinationsRouter;