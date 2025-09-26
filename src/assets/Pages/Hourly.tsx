import React, { useState } from "react";

type ForecastItem = {
  dt: number;
  main: { temp: number; humidity: number };
  wind: { speed: number };
  weather: { description: string; icon: string }[];
};

export default function Hourly() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [error, setError] = useState("");

  const API_KEY = "0c3c4537724ac48515517f438aa791cf";

  const getForecast = async () => {
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }

    try {
      setError("");
      setForecast([]);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setForecast(data.list);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="forecast-container">
      <h2>Hourly Forecast</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getForecast()}
        />
        <button onClick={getForecast}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {forecast.length > 0 && (
        <div className="forecast-grid">
          {forecast.map((item, idx) => (
            <div className="forecast-card" key={idx}>
              <p>{new Date(item.dt * 1000).toLocaleString()}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
              <p>{item.weather[0].description}</p>
              <p>{item.main.temp}°C</p>
              <p>Humidity: {item.main.humidity}%</p>
              <p>Wind: {item.wind.speed} m/s</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
