import Header from "./components/Header";
import EmployeeTable from "./components/EmployeesTable";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CreateEmployee from "./pages/CreateEmployee";
import ViewEmployee from "./pages/ViewEmployee";
import DeleteEmployee from "./pages/DeleteEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import { JWT_TOKEN } from "./constants";

// const App = () => {
//     return (
//         <div className="App">
//             <Header title="Employee Management Sys" />
//         </div>
//     )
// }

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-employee"
                    element={
                        <ProtectedRoute>
                            <CreateEmployee />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/view-employee/:employee_id"
                    element={
                        <ProtectedRoute>
                            <ViewEmployee />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/delete-employee/:employee_id"
                    element={
                        <ProtectedRoute>
                            <DeleteEmployee />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<RegisterAndLogout />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
