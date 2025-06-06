import React from "react";

export default function Footer() {
  const footerStyle = {
    backgroundColor: "#333333",
    color: "white",
    padding: "10px 0",
    textAlign: "center",
    fontSize: "14px",
    position: "fixed",
    bottom: 0,
    width: "100%",
    borderTop: "1px solid #ccc",
  };

  return (
    <div style={footerStyle}>
      &copy; 2005. All rights Reserved.
    </div>
  );
}
