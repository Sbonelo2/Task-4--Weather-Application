import React from "react";
import { Link } from "react-router";
export default function Navbar() {
  return (
    <div
      className="Navbar"
      style={{
        backgroundColor: "black",
        width: "100%",
        padding: "1rem",
        color: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        // flexWrap: "wrap",
      }}
    >
      <Link to="/Home">Home</Link>
      <Link to="/Weather">Weather</Link>
      <Link to="/Maps">Maps</Link>
      <Link to="/Hourly">Hourly</Link>
      <Link to="/Monthly">Monthly</Link>
    </div>
  );
}
