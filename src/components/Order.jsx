import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders/${user.email}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    if (user.email) {
      fetchOrders();
    }
  }, [user.email]);

  // Styles
  const containerStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
  };

  const listStyle = {
    listStyleType: "decimal",
    paddingLeft: "20px",
  };

  const listItemStyle = {
    backgroundColor: "#fff",
    marginBottom: "10px",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    fontWeight: "500",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <h3>My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ol style={listStyle}>
          {orders.map((value) => (
            <li key={value._id} style={listItemStyle}>
              <strong>Email:</strong> {value.email} <br />
              <strong>Order Value:</strong> ₹{value.orderValue}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
