import { useState } from 'react';
import api from '../api';
import { useNavigate } from "react-router-dom";
import { JWT_TOKEN } from '../constants';

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await api.post("/user/login/", {
                email,
                password,
            });

            const { jwt_token } = response.data;
            localStorage.setItem(JWT_TOKEN, jwt_token);
            navigate("/");
            console.log("JWT Token:", jwt_token);
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: ", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row">
            <div className="card col-md-6 offset-md-3">
                <h3 className="card-header">Login</h3>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
                            </small>
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
                        {/* <button type="submit" className="btn btn-primary">
                            Submit
                        </button> */}
                        <button type="submit" disabled={loading} className="btn btn-primary mt-4">
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
