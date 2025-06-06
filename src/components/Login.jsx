import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { users, user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    const url = `${API}/users/login`;
    const found = await axios.post(url, user);
    console.log(found);

    if (found.data.email) {
      setUser(found.data);
      Navigate("/");
    } else {
      setMsg("Invalid User or Password");
    }
  };

  const goToRegister = () => {
    Navigate("/register");
  };

  // Styling
  const containerStyle = {
    margin: "50px auto",
    padding: "30px",
    maxWidth: "400px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const errorMsgStyle = {
    color: "red",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <h3>Login</h3>
      {msg && <div style={errorMsgStyle}>{msg}</div>}
      <input
        type="text"
        placeholder="Email address"
        style={inputStyle}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        style={inputStyle}
        onChange={(e) => setUser({ ...user, pass: e.target.value })}
      />
      <button onClick={handleSubmit} style={buttonStyle}>
        Submit
      </button>
      <button onClick={goToRegister} style={{ ...buttonStyle, backgroundColor: "#2196F3" }}>
        Create Account
      </button>
    </div>
  );
}
