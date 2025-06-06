import React from "react";
import App, { AppContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useContext(AppContext);

  const headerStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    textAlign: "center",
    borderRadius: "8px",
  };

  const linkStyle = {
    color: "white",
    margin: "0 10px",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const navStyle = {
    marginTop: "10px",
    marginBottom: "10px",
  };

  return (
    <div style={headerStyle}>
      <h1>My Online Shop</h1>
      <div style={navStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        -
        <Link to="/cart" style={linkStyle}>
          Cart
        </Link>
        -
        <Link to="/order" style={linkStyle}>
          Order
        </Link>
        -
        {user.token ? (
          <Link to="/logout" style={linkStyle}>
            Logout
          </Link>
        ) : (
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        )}
      </div>
      <hr />
    </div>
  );
}
