import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
        background: theme === "dark" ? "#1a1a1a" : "#000",
        width: "100%",
        padding: "1rem 2rem",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: theme === "dark" ? "0 4px 12px rgba(255,255,255,0.1)" : "0 4px 12px rgba(0,0,0,0.3)",
        flexWrap: "wrap",
        gap: "15px",
        borderBottom: `2px solid ${theme === "dark" ? "#444" : "#fff"}`,
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
        alignItems: "center",
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
        <button
          onClick={toggleTheme}
          style={{
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            background: theme === "dark" ? "#fff" : "transparent",
            color: theme === "dark" ? "#000" : "#fff",
            border: theme === "dark" ? "2px solid #fff" : "2px solid rgba(255, 255, 255, 0.3)",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "normal",
          }}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}

