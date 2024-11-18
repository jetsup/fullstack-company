import { useState } from 'react';
import api from '../api';
import { useNavigate } from "react-router-dom";
import { JWT_TOKEN } from '../constants';

function RegisterForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await api.post("/user/signup/", {
                email,
                username,
                password,
            });

            const { jwt_token } = response.data;
            localStorage.setItem(JWT_TOKEN, jwt_token);
            navigate("/");
            console.log("JWT Token:", jwt_token);
        } catch (error) {
            console.error("Register error:", error);
            alert("Register failed: ", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row">
            <div className="card col-md-6 offset-md-3">
                <h3 className="card-header">Register</h3>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="usernameInput">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="usernameInput"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary mt-4">
                            {loading ? "Loading..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
