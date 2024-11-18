import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import api from "../api";

function DeleteEmployee({ employeeId }) {
    const [employees, setEmployees] = useState([]);

    const { employee_id } = useParams();

    useEffect(() => {
        deleteEmployee(employee_id);
    }, []);

    const deleteEmployee = (id) => {
        api.delete(`/emp/employees/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    setEmployees(employees.filter((employee) => employee.id !== id));
                    console.log("Employee deleted successfully");
                } else {
                    console.error("Failed to delete employee");
                }
            })
            .catch((err) => console.error(err));
    }

    return (
        <Navigate to="/" />
    );
}

export default DeleteEmployee;
