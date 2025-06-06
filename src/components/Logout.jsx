import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { user, setUser } = useContext(AppContext);
  const Navigate = useNavigate();

  useEffect(() => {
    setUser({});
    Navigate("/login");
  }, []);

  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#555",
  };

  return <div style={containerStyle}>Logging out...</div>;
}
