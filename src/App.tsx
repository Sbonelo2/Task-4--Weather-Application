import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/NavBar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./assets/Pages/Home";
import Hourly from "./assets/Pages/Hourly";
import Maps from "./assets/Pages/Maps";
import Monthly from "./assets/Pages/Monthly";
import Weather from "./assets/Pages/Weather";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/hourly" element={<Hourly />} />
          <Route path="/monthly" element={<Monthly />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;




















