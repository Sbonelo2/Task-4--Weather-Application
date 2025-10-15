import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || (path === "/" && location.pathname === "/home");
  };

  const linkStyle = (path: string) => ({
    color: "white",
    textDecoration: "none",
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    fontWeight: isActive(path) ? "bold" : "normal",
    backgroundColor: isActive(path) ? "rgba(255, 255, 255, 0.2)" : "transparent",
    border: isActive(path) ? "2px solid rgba(255, 255, 255, 0.3)" : "2px solid transparent",
  });

  return (
    <nav
      className="Navbar"
      style={{
        background: "#000",
        width: "100%",
        padding: "1rem 2rem",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        flexWrap: "wrap",
        gap: "15px",
        borderBottom: "2px solid #fff",
      }}
    >
      <Link to="/" style={{ 
        color: "white", 
        textDecoration: "none",
        fontSize: "1.5rem",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <span style={{ fontSize: "2rem" }}>☀️</span>
        WeatherApp
      </Link>
      
      <div style={{ 
        display: "flex", 
        gap: "10px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        <Link to="/" style={linkStyle("/")}>
          🏠 Home
        </Link>
        <Link to="/weather" style={linkStyle("/weather")}>
          🌤️ Weather
        </Link>
        <Link to="/hourly" style={linkStyle("/hourly")}>
          ⏰ Hourly
        </Link>
        <Link to="/monthly" style={linkStyle("/monthly")}>
          📅 Daily
        </Link>
        <Link to="/maps" style={linkStyle("/maps")}>
          🗺️ Maps
        </Link>
      </div>
    </nav>
  );
}

