const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const userRouter = express.Router();

