import React, { useState } from "react";
import "./Auth.css"; // You'll create this next

export default function Auth({ setToken }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch(
        `https://mental-wellness-journal-ds4l.onrender.com/auth/${mode}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        setMsg("Login successful");
      } else {
        setMsg(data.error || data.message);
      }
    } catch (err) {
      setMsg("Server error");
    }
    setLoading(false);
  }

  return (
    <div className={`auth-bg ${mode}`}>
      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setMsg("");
            }}
            disabled={loading}
          >
            Login
          </button>
          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setMsg("");
            }}
            disabled={loading}
          >
            Sign Up
          </button>
        </div>
        <h2>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            placeholder="Username"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading
              ? mode === "login"
                ? "Logging in..."
                : "Signing up..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>
        </form>
        <div className="auth-msg">{msg}</div>
      </div>
    </div>
  );
}
