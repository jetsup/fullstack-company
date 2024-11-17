import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchAndDisplayEmployees = async () => {
      const fetchedEmployees = await fetchEmployees();
      setEmployees(fetchedEmployees);
    };

    fetchAndDisplayEmployees();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          {/* Add more headers as needed */}
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            {/* Add more table cells as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const fetchEmployees = async () => {
    // use axios to query the database
    const response = await axios.get('http://localhost:5000/employees');
    return response.data;
}

export default EmployeeTable;
