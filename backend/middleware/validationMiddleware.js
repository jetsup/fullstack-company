// middleware/validationMiddleware.js
const { check, validationResult } = require('express-validator');

// Validation rules for signup
exports.validateSignup = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

// Validation rules for login
exports.validateLogin = [
  check('email').optional().isEmail().withMessage('Please include a valid email'),
  check('username').optional().not().isEmpty().withMessage('Username cannot be empty'),
  check('password', 'Password is required').exists(),
  (req, res, next) => {
    if (!req.body.email && !req.body.username) {
      return res.status(400).json({
        status: false,
        message: 'Please provide email or username for login',
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

// Validation rules for employee creation
exports.validateEmployee = [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('position', 'Position is required').not().isEmpty(),
    check('salary', 'Salary must be a number').isNumeric(),
    check('date_of_joining', 'Date of joining must be a valid date').isISO8601(),
    check('department', 'Department is required').not().isEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: false,
          errors: errors.array().map((err) => err.msg),
        });
      }
      next();
    },
  ];
  