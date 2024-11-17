const Employee = require("../models/Employee");

// @desc    Get all employees
// @route   GET /api/v1/emp/employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().select("-__v");
        const formattedEmployees = employees.map((emp) => ({
            employee_id: emp._id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email,
            position: emp.position,
            salary: emp.salary,
            date_of_joining: emp.date_of_joining,
            department: emp.department,
        }));
        res.status(200).json(formattedEmployees);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            status: false,
            message: "Server Error",
        });
    }
};

// @desc    Create a new employee
// @route   POST /api/v1/emp/employees
exports.createEmployee = async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
    } = req.body;

    try {
        // Check if employee with the same email exists
        let employee = await Employee.findOne({ email });

        if (employee) {
            return res.status(400).json({
                status: false,
                message: "Employee with this email already exists",
            });
        }

        // Create new employee
        employee = await Employee.create({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
        });

        res.status(201).json({
            message: "Employee created successfully.",
            employee_id: employee._id,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            status: false,
            message: "Server Error",
        });
    }
};

// @desc    Get employee by ID
// @route   GET /api/v1/emp/employees/:eid
exports.getEmployeeById = async (req, res) => {
    const { eid } = req.params;

    try {
        const employee = await Employee.findById(eid).select("-__v");

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            employee_id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining,
            department: employee.department,
        });
    } catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                status: false,
                message: "Invalid Employee ID",
            });
        }
        res.status(500).json({
            status: false,
            message: "Server Error",
        });
    }
};

// @desc    Update employee details
// @route   PUT /api/v1/emp/employees/:eid
exports.updateEmployee = async (req, res) => {
    const { eid } = req.params;
    const updateData = req.body;

    try {
        let employee = await Employee.findById(eid);

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: "Employee not found",
            });
        }

        // Update fields
        Object.keys(updateData).forEach((key) => {
            employee[key] = updateData[key];
        });

        await employee.save();

        res.status(200).json({
            message: "Employee details updated successfully.",
        });
    } catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                status: false,
                message: "Invalid Employee ID",
            });
        }
        res.status(500).json({
            status: false,
            message: "Server Error",
        });
    }
};

// @desc    Delete employee
// @route   DELETE /api/v1/emp/employees/employeeid
exports.deleteEmployee = async (req, res) => {
    const { eid } = req.params;

    if (!eid) {
        return res.status(400).json({
            status: false,
            message: "Employee ID is required",
        });
    }

    try {
        const employee = await Employee.findById(eid);

        console.log("Employee: ", employee);

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: "Employee not found",
            });
        }

        Employee.deleteOne({ _id: eid }).exec();

        // status 204 means No Content - You should not expect any content in the response
        res.status(204).json({
            message: "Employee deleted successfully.",
        });
    } catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                status: false,
                message: "Invalid Employee ID",
            });
        }
        res.status(500).json({
            status: false,
            message: "Server Error",
        });
    }
};
