const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/v1/user/signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({
        status: false,
        message: 'User with this email or username already exists',
      });
    }

    // Create new user
    user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      message: 'User created successfully.',
      user_id: user._id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: false,
      message: 'Server Error',
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/v1/user/login
exports.login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username }],
    }).select('+password');

    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'Invalid Username and password',
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: 'Invalid Username and password',
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful.',
      jwt_token: token, // Optional implementation
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: false,
      message: 'Server Error',
    });
  }
};
