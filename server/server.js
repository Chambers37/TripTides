const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// Test route to confirm server and MongoDB connection
app.get('/', (req, res) => {
  res.send('Server is running and MongoDB is connected!');
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));