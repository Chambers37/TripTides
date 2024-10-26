const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./api/routes/userRoutes');

const app = express();

connectDB();

// Test route to confirm server and MongoDB connection
app.get('/', (req, res) => {
  res.send('Server is running and MongoDB is connected!');
});

app.use('/api/users', userRouter);

const PORT = process.env.PORT 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));