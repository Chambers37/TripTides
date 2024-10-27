const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./api/routes/userRoutes');
const destinationsRouter = require('./api/routes/destinationsRoutes');

const app = express();

connectDB();

app.use(express.json());

// Test route to confirm server and MongoDB connection
app.get('/', (req, res) => {
  res.send('Server is running and MongoDB is connected!');
});

app.use('/api/users', userRouter);

app.use('/api/destinations', destinationsRouter);

const PORT = process.env.PORT 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));