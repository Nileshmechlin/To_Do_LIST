import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validateMobile(mobile)) {
      setMobileError("Mobile number must be exactly 10 digits.");
      valid = false;
    } else {
      setMobileError("");
    }

    if (!valid) return;

    const formData = { name, age, email, mobile, password };
    axios
      .post("http://localhost:8080/api/user/register", formData)
      .then((result) => {
        console.log(result);
        // Navigate to login or any other page after successful registration
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pt-5">
      <div
        className="container-fluid p-4"
        style={{ backgroundColor: "#F0F8FF" }}
      >
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <form
              onSubmit={handleSubmit}
              className="border border-info p-4 rounded shadow-lg bg-white"
            >
              <h2 className="text-center mb-4 text-info">Register</h2>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-secondary"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control border-info"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </div>
                {emailError && <div className="text-danger">{emailError}</div>}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label text-secondary"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control border-info"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputName1"
                  className="form-label text-secondary"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control border-info"
                  id="exampleInputName1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputMobile1"
                  className="form-label text-secondary"
                >
                  Mobile number
                </label>
                <input
                  type="text"
                  className="form-control border-info"
                  id="exampleInputMobile1"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                {mobileError && (
                  <div className="text-danger">{mobileError}</div>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputAge1"
                  className="form-label text-secondary"
                >
                  Age
                </label>
                <input
                  type="number"
                  className="form-control border-info"
                  id="exampleInputAge1"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Agree to terms and conditions
                </label>
              </div>
              <button type="submit" className="btn btn-info w-100">
                Register
              </button>
              <div className="text-center mt-3">
                <NavLink
                  to="/login"
                  className="text-decoration-none text-primary"
                >
                  Already have an account?{" "}
                  <span className="fw-bold">Login</span>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
