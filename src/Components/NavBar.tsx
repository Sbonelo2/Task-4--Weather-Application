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
      <Link to="/jobs">Jobs</Link>
      <Link to="/Page404">Page404</Link>
      <Link to="/Registration">Registration</Link>
      <Link to="/Login">Login</Link>
    </div>
  );
}
