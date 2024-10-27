const express = require('express');
const { searchDestinations } = require('../controllers/destinationSearchController');

const destinationsRouter = express.Router();

destinationsRouter.get('/search', searchDestinations);

module.exports = destinationsRouter;