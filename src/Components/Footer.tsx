
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#1a1a1a" : "black",
        color: "white",
        textAlign: "center",
        padding: "1rem",
        marginTop: "56.5rem",
      }}
    >
      <p>&copy;2025 Weatherservices</p>
    </div>
  );
}
