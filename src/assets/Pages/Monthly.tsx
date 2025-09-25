import React, { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");

  type WeatherData = {
    name: string;
    sys: { country: string };
    main: { temp: number; humidity: number };
    wind: { speed: number };
    weather: { description: string }[];
  };

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  // ✅ Make sure this is your full valid API key from OpenWeatherMap
  const API_KEY = "9b4c3c2265e16b5b59c568c9550648e1";

  const getWeather = async () => {
    if (!city) {
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="weather-container">
      <h2>Search Weather by City</h2>
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
          <h3>
            {weather.name}, {weather.sys?.country}
          </h3>
          <p>🌡️ Temperature: {weather.main?.temp}°C</p>
          <p>💧 Humidity: {weather.main?.humidity}%</p>
          <p>🌬️ Wind Speed: {weather.wind?.speed} m/s</p>
          <p>☁️ Condition: {weather.weather?.[0]?.description}</p>
        </div>
      )}
    </div>
  );
}
