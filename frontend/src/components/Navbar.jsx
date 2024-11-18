// import { Link } from "react-router-dom";

// function Navbar() {
//     return (
//         <nav className="navbar navbar-expand navbar-light bg-light">

//         </nav>
//     );
// }

// export default Navbar;

import React from 'react';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
                <a className="navbar-brand" href="/">Employee Management System</a>
                <a href="/logout" className="ms-auto">
                    <button className="btn btn-secondary"><i className="fa fa-sign-out"></i> Logout</button>
                </a>
            
        </nav >
    );
}

export default Navbar;
