import React, { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  type WeatherData = {
    name: string;
    sys: { country: string };
    main: { temp: number; humidity: number };
    wind: { speed: number };
    weather: { description: string; icon: string; main: string }[];
  };

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const API_KEY = "0c3c4537724ac48515517f438aa791cf";

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }

    try {
      setError("");
      setWeather(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const containerStyle =
    theme === "dark"
      ? {
          backgroundColor: "#1e1e1e",
          color: "#f5f5f5",
          minHeight: "100vh",
          padding: "20px",
        }
      : {
          backgroundColor: "#ffffff",
          color: "#333",
          minHeight: "100vh",
          padding: "20px",
        };

  return (
    <div style={containerStyle}>
      <h2>Search Weather by your fav City</h2>
      <button onClick={toggleTheme} style={{
        marginBottom: "10px",
        background: "black",
        color: "white",
       }}>
         {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <div className="weather-header">
            {weather.name}, {weather.sys?.country}
          </div>
          <div
            className="weather-main"
            style={
              weather.weather[0].main === "Clear"
                ? { backgroundColor: "yellow" }
                : {
                    background: "linear-gradient(90deg, #334D50, #CBCAA5)",
                  }
            }
          >
            <div className="img-container">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                width="100%"
              />
            </div>
          </div>

          <div className="weather-footer">
            <p>☁️ {weather.weather[0].description}</p>
            <p>🌡️ Temperature: {weather.main.temp}°C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}
