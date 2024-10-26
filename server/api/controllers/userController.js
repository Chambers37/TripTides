const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }


    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registeder successfully' });
    
  } catch (error) {
    console.error('Error in registerUser:', error); // testing
    res.status(500).json({ message: 'Server error', error });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Checking password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

module.exports = { registerUser, loginUser }