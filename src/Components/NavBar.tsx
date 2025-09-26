import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="Navbar"
      style={{
        backgroundColor: "black",
        width: "100%",
        padding: "1rem",
        color: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Link to="/weather" style={{ color: "white", textDecoration: "none" }}>
        Weather
      </Link>
      <Link to="/hourly" style={{ color: "white", textDecoration: "none" }}>
        Hourly
      </Link>
      <Link to="/monthly" style={{ color: "white", textDecoration: "none" }}>
        Monthly
      </Link>
      <Link to="/maps" style={{ color: "white", textDecoration: "none" }}>
        Maps
      </Link>
    </nav>
  );
  }

