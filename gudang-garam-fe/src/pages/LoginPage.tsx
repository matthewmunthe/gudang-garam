import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../index.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.status === 500) {
      setError("Invalid credential");
    }
    const data = await res.json();
    console.log(data.token);
    if (data.token) {
      setAuth(data.token, data.role);
      navigate("/dashboard");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <h1>LOGIN</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <p style={{ color: "red" }}>{error}</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
export default LoginPage;
