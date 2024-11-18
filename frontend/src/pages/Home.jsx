// import DataTable from 'datatables.net-react';
// import DT from 'datatables.net-dt';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import { useState, useEffect } from "react";
import api from "../api";
import Navbar from '../components/Navbar';

function Home() {
    const [employees, setEmployees] = useState([]);
    

    DataTable.use(DT);

    const columns = [
        { title: "First Name", data: "first_name" , orderable: true},
        { title: "Last Name", data: "last_name" , orderable: true},
        { title: "Email", data: "email" , orderable: true},
        { title: "Position", data: "position" , orderable: true},
        { title: "Salary", data: "salary" , orderable: true},
        { title: "Department", data: "department" , orderable: true},
        { title: "Joined",  orderable: true,
            // new Date().toISOString().split('T')[0] data: "date_of_joining" 
            render: function (data, type, row) {
                return new Date(row.date_of_joining).toISOString().split('T')[0];
            }
        },
        {
            title: "Actions",
            orderable: false,
            render: function (data, type, row) {
                return `
                    <a href="/view-employee/${row.employee_id}" class="btn btn-primary btn-sm">
                        <i class="fa fa-eye"></i>
                    </a>
                    <a href="/delete-employee/${row.employee_id}" class="btn btn-danger btn-sm">
                        <i class="fa fa-trash"></i>
                    </a>
                `;
            }
            /* <button class="btn btn-danger btn-sm" onClick={() => deleteEmployee(${row.employee_id})}>
            <i class="fa fa-trash"></i> D
            </button> */
        }
    ]

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {

        api.get("/emp/employees/")
            .then((res) => res.data)
            .then((data) => {
                setEmployees(data);
                console.log(data)
            })
            .catch((err) => alert(err))
    }


    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex justify-content-between mt-2">
                            <h3>Employees</h3>
                            <a href="/create-employee" className="text-white">
                                <button className="btn btn-primary">
                                    <i className="fa fa-plus"></i> Add Employee
                                </button>
                            </a>
                        </div>
                        {/* make columns resize auto */}
                        <DataTable data={employees} columns={columns} className="display"/>
                    </div>
                </div>
            </div>
            {/* populate the table using datatables */}
            <script>
                $(document).ready(function() {
                    // $('#boards-table').DataTable()

                });
            </script>
        </div>
    );
}

export default Home;
