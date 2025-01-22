import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/api/users/login", {
        email,
        password,
      });
      console.log(response.data);

      if (response.data && response.data.success) {
        window.location.href = "/create-campaign"; // // Redirect to the campaign form page after successful login
      } else {
        setError(response.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error during form submission:", err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{ padding: "20px", border: "1px solid #d1d5db", borderRadius: "8px", backgroundColor: "#fff", width: "300px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: "12px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "6px", fontWeight: "bold", color: "#374151" }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }}
              required
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "6px", fontWeight: "bold", color: "#374151" }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }}
              required
            />
          </div>
          <button
            type="submit"
            style={{ width: "100%", padding: "10px", backgroundColor: "#4f46e5", color: "#fff", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer" }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "12px", textAlign: "center", color: "#6b7280" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#4f46e5", cursor: "pointer", textDecoration: "underline" }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
