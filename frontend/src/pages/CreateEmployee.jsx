import { useState, useEffect } from "react";
import api from "../api";

function CreateEmployee() {
    const [employees, setEmployees] = useState([]);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [department, setDepartment] = useState("");
    const [date_of_joining, setDateOfJoining] = useState("");

    const createEmployee = (e) => {
        e.preventDefault();
        api.post("/emp/employees/", { first_name, last_name, email, position, salary, department, date_of_joining })
            .then((res) => {
                if (res.status === 201) {
                    setEmployees([...employees, res.data]);
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPosition("");
                    setSalary("");
                    setDepartment("");
                    setDateOfJoining("");
                    // getEmployees();
                    console.log("Employee created successfully");
                } else {
                    alert("Failed to create employee");
                }
            })
            .catch((err) => alert(err));
    }

    return (
        <div>
            <div className="row mt-4">
                <div className="card col-md-6 offset-md-3">
                    <div className="card-header d-flex justify-content-between">
                        <h3 className="">Create Employee</h3>
                        <a href="/" className="">
                            <button className="btn btn-secondary"><i className="fa fa-chevron-left"></i> Back</button>
                        </a>
                    </div>
                    <div className="card-body">
                        <form onSubmit={createEmployee} className="form">
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
                            <button type="submit" className="btn btn-primary mt-3">
                                Create Employee
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateEmployee;
