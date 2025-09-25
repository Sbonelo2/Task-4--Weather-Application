import React from "react";
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/Pages/Home";
import Hourly from "./assets/Pages/Hourly";
import Maps from "./assets/Pages/Maps";
import Monthly from "./assets/Pages/Monthly";
import Weather from "./assets/Pages/Weather";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Weather" element={<Weather />} />
        <Route path="/Maps" element={<Maps />} />
        <Route path="/Hourly" element={<Hourly />} />
        <Route path="/Monthly" element={<Monthly />} />

        
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;




















