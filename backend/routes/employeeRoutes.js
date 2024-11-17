const express = require('express');
const {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const { validateEmployee } = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware'); // If using JWT

const router = express.Router();

// Protect routes
router.use(protect); // comment this line if not using JWT

router.route('/')
  .get(getEmployees)
  .post(validateEmployee, createEmployee);

router.route('/:eid')
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
