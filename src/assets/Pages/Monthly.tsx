import React, { useState } from "react";

type DailyItem = {
  dt: number;
  temp: { day: number; night: number };
  humidity: number;
  wind_speed: number;
  weather: { description: string; icon: string }[];
};

export default function Monthly() {
  const [city, setCity] = useState("");
  const [daily, setDaily] = useState<DailyItem[]>([]);
  const [error, setError] = useState("");

  const API_KEY = "0c3c4537724ac48515517f438aa791cf";

  const getDailyForecast = async () => {
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }

    try {
      setError("");
      setDaily([]);

      // Step 1: get coordinates from current weather
      const geoRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}`
      );
      if (!geoRes.ok) throw new Error("City not found");
      const geoData = await geoRes.json();
      const { lon, lat } = geoData.coord;

      // Step 2: get daily forecast (One Call)
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      setDaily(data.daily);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="forecast-container">
      <h2>Daily Forecast</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getDailyForecast()}
        />
        <button onClick={getDailyForecast}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {daily.length > 0 && (
        <div className="forecast-grid">
          {daily.map((item, idx) => (
            <div className="forecast-card" key={idx}>
              <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
              <p>{item.weather[0].description}</p>
              <p>
                Day: {item.temp.day}°C / Night: {item.temp.night}°C
              </p>
              <p>Humidity: {item.humidity}%</p>
              <p>Wind: {item.wind_speed} m/s</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
