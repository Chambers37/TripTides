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
    console.log(`Coordinates: ${lat}, ${lng}`)
    return { lat, lng };

  } catch (error) {
    console.error('Error with Geocoding API:', error);
    throw new Error('Could not fetch coordinates.');
  }
};

const searchDestinations = async (req, res) => {
  const { location, radius } = req.body;
  console.log('Received request for location:', location, 'with radius:', radius);

  try {
    const { lat, lng } = await getCoordinates(location);
    console.log(`Coordinates found: ${lat}, ${lng}`);

    const response = await axios.post( 'https://places.googleapis.com/v1/places:searchNearby', {
      includedTypes: ['tourist_attraction', 'restaurant'],
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng
          },
          radius: parseFloat(radius)
        }
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.displayName'
      }
    });

    console.log('Sending response:', response.data.places);
    res.json(response.data.places);

  } catch (error) {
    console.error('Error fetching destinations:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch destinations', details: error.message });
  }
};

module.exports = { searchDestinations };