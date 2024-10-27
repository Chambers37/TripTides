require('dotenv').config();
const axios = require('axios');

// Helper function to convert city/state into lat/long coordinates
const getCoordinates = async (cityState) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: cityState,
        key: process.env.GOOGLE_API_KEY
      }
    });

    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };

  } catch (error) {
    console.error('Error with Geocoding API:', error);
    throw new Error('Could not fetch coordinates.');
  }
};

const searchDestinations = async (req, res) => {
  const { location, radius } = req.query;

  try {
    const { lat, lng } = await getCoordinates(location);

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        key: process.env.GOOGLE_API_KEY,
        location: `${lat},${lng}`,
        radius,
        type: 'tourist_attraction',
      }
    });

    res.json(response.data.results);

  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
};

module.exports = { searchDestinations };