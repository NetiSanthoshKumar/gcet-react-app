import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const { cart, setCart, products, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Recalculate orderValue every time cart or products change
  useEffect(() => {
    const total = products.reduce((sum, product) => {
      const qty = cart[product._id] ?? 0;
      return sum + product.price * qty;
    }, 0);
    setOrderValue(total);
  }, [cart, products]);

  // Add or increment item quantity in cart immutably
  const increment = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  // Decrement item quantity or remove if 0
  const decrement = (id) => {
    setCart((prevCart) => {
      const currentQty = prevCart[id] || 0;
      if (currentQty <= 1) {
        // Remove product from cart if quantity is 1 or less
        const { [id]: _, ...rest } = prevCart;
        return rest;
      } else {
        return {
          ...prevCart,
          [id]: currentQty - 1,
        };
      }
    });
  };

  const placeOrder = async () => {
    try {
      const url = `${API}/orders/new`;
      await axios.post(url, { email: user.email, orderValue: orderValue });
      setCart({});
      Navigate("/order");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const loginToOrder = () => {
    Navigate("/login");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h2>My Cart</h2>
      {products &&
        products.map(
          (product) =>
            cart[product.pid] && (
              <div
                key={product.pid}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <div>
                  <strong>{product.name}</strong> - ₹{product.price}
                </div>
                <div>
                  <button
                    onClick={() => decrement(product.pid)}
                    style={{ padding: "4px 10px", marginRight: "8px" }}
                  >
                    -
                  </button>
                  <span>{cart[product.pid]}</span>
                  <button
                    onClick={() => increment(product.pid)}
                    style={{ padding: "4px 10px", marginLeft: "8px" }}
                  >
                    +
                  </button>
                </div>
                <div>₹{product.price * cart[product.pid]}</div>
              </div>
            )
        )}
      <hr />
      <h3>Order Value: ₹{orderValue}</h3>
      <hr />
      {user.name ? (
        <button
          onClick={placeOrder}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={orderValue === 0}
        >
          Place Order
        </button>
      ) : (
        <button
          onClick={loginToOrder}
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login to Order
        </button>
      )}
      <hr />
    </div>
  );
}
