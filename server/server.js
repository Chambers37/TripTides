const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./api/routes/userRoutes');
const destinationsRouter = require('./api/routes/destinationsRoutes');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', userRouter);

app.use('/api/destinations', destinationsRouter);

app.use('/', (rew, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
})

const PORT = process.env.PORT 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));