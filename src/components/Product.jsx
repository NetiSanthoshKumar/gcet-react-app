import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Product.css";

export default function Product() {
  const { user, products, setProducts, cart, setCart } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products/all`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (id) => {
    if (cart[id]) {
      setCart({ ...cart, [id]: cart[id] + 1 });
    } else {
      setCart({ ...cart, [id]: 1 });
    }
  };

  return (
    <div>
      <h3>Welcome {user?.name || "Guest"}!</h3>
      <div className="App-Product-Row">
        {products &&
          products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                margin: "10px",
                width: "200px",
                borderRadius: "5px",
              }}
            >
              <h3>{product.name}</h3>
              <h4>₹{product.price}</h4>
              <button
                onClick={() => addToCart(product._id)}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
