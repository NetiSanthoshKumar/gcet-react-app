import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [user, setUser] = useState({});
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API}/users/register`;
      await axios.post(url, user);
      Navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Styles
  const containerStyle = {
    margin: "50px auto",
    padding: "30px",
    maxWidth: "400px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f4f4f4",
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

  const listStyle = {
    textAlign: "left",
    marginTop: "20px",
    paddingLeft: "20px",
  };

  return (
    <div style={containerStyle}>
      <h3>Register</h3>
      <input
        type="text"
        placeholder="Name"
        style={inputStyle}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email address"
        style={inputStyle}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="New Password"
        style={inputStyle}
        onChange={(e) => setUser({ ...user, pass: e.target.value })}
      />
      <button onClick={handleSubmit} style={buttonStyle}>
        Submit
      </button>
      <hr />
      {users && (
        <ul style={listStyle}>
          {users.map((value, index) => (
            <li key={index}>
              {value.name} - {value.email} - {value.pass}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
