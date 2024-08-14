import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8080/api/user/login', { email, password })
            .then((response) => {
                const { token } = response.data;
                localStorage.setItem("token", token);
                
                // Navigate to the dashboard after successful login
                navigate("/dashboard"); 
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    // Show alert for invalid credentials
                    alert("Invalid email or password");
                } else {
                    console.error("Error during login:", error.message);
                    alert("An error occurred during login. Please try again.");
                }
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card border-primary shadow-lg rounded-lg">
                        <div className="card-body p-4 bg-light">
                            <h2 className="text-center mb-4 text-primary">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label text-secondary">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control border-secondary"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="password" className="form-label text-secondary">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control border-secondary"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Login
                                    </button>
                                </div>
                                <div className="text-center mt-3">
                                    <NavLink to="/register" className="text-decoration-none text-info">
                                        Don't have an account? <span className="fw-bold">Sign Up</span>
                                    </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

