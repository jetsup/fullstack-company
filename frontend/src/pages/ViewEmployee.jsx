import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";

function ViewEmployee({ employeeId }) {
    const [employees, setEmployees] = useState([]);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [department, setDepartment] = useState("");
    const [date_of_joining, setDateOfJoining] = useState("");

    const { employee_id } = useParams();

    useEffect(() => {
        console.log("Effect Employee ID:", employee_id);
        getEmployee(employee_id);
    }, []);

    const getEmployee = (employee_id) => {
        console.log("Employee ID:", employee_id);
        api.get(`/emp/employees/` + employee_id + '/')
            .then((res) => res.data)
            .then((data) => {
                setEmployees(data);

                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setPosition(data.position);
                setSalary(data.salary);
                setDepartment(data.department);
                setDateOfJoining(new Date(data.date_of_joining).toISOString().split('T')[0]);

                console.log("Data Employee:", data)
                console.log("Employee:", employees)
                console.log("First Name:", employees.first_name)
            })
            .catch((err) => alert(err))
    }

    const updateEmployee = (e) => {
        e.preventDefault();
        api.put("/emp/employees/" + employee_id, { first_name, last_name, email, position, salary, department, date_of_joining })
            .then((res) => {
                console.log("Response:", res.status);
                if (res.status === 200) {
                    console.log("Employee updated successfully");
                } else {
                    console.error("Failed to create employee");
                }
            })
            .catch((err) => console.error("Update Err:", err));
    }

    return (
        <div>
            <Navbar />
            <div className="row mt-4">
                <div className="card col-md-6 offset-md-3">
                    <div className="card-header d-flex justify-content-between">
                        <h3 className="">View Employee</h3>
                        <a href="/" className="">
                            <button className="btn btn-secondary"><i className="fa fa-chevron-left"></i> Back</button>
                        </a>
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateEmployee} className="form">
                            <div className="form-group md-3">
                                <label className="form-label" htmlFor="first_name">First Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    required
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-group md-3">
                                <label className="form-label" htmlFor="last_name">Last Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    required
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="form-group md-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group md-3">
                                <label className="form-label" htmlFor="position">Position</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="position"
                                    id="position"
                                    required
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                            </div>
                            <div className="form-group md-3">
                                <label className="form-label" htmlFor="salary">Salary</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="salary"
                                    id="salary"
                                    required
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                            </div>
                            <div className="form-group md-3">
                                <label className="form-label" htmlFor="department">Department</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="department"
                                    id="department"
                                    required
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                            </div>
                            <div className="form-group md-3">
                                <label className="form-label" htmlFor="date_of_joining">Date of Joining</label>
                                <input
                                    className="form-control"
                                    type="date"
                                    name="date_of_joining"
                                    id="date_of_joining"
                                    required
                                    value={date_of_joining}
                                    onChange={(e) => setDateOfJoining(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-success mt-3">
                                Update Employee
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewEmployee;
