import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export default function Weather() {
  const [city, setCity] = useState("");
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  type WeatherData = {
    name: string;
    sys: { country: string; sunrise: number; sunset: number };
    main: { 
      temp: number; 
      humidity: number; 
      feels_like: number;
      pressure: number;
      temp_min: number;
      temp_max: number;
    };
    wind: { speed: number; deg: number };
    weather: { description: string; icon: string; main: string }[];
    visibility: number;
    clouds: { all: number };
    coord: { lat: number; lon: number };
  };

  type AirQualityData = {
    list: [{
      main: { aqi: number };
      components: {
        pm2_5: number;
        pm10: number;
        no2: number;
        o3: number;
      };
    }];
  };

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [error, setError] = useState("");

  const API_KEY = "0c3c4537724ac48515517f438aa791cf";

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favoriteCities");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const getWeather = async (searchCity?: string) => {
    const targetCity = searchCity || city;
    if (!targetCity.trim()) {
      setError("Please enter a city");
      return;
    }

    try {
      setError("");
      setLoading(true);
      setWeather(null);
      setAirQuality(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          targetCity
        )}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);

      // Fetch air quality data
      const airRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`
      );
      if (airRes.ok) {
        const airData = await airRes.json();
        setAirQuality(airData);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (weather && !favorites.includes(weather.name)) {
      const newFavorites = [...favorites, weather.name];
      setFavorites(newFavorites);
      localStorage.setItem("favoriteCities", JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (cityName: string) => {
    const newFavorites = favorites.filter(f => f !== cityName);
    setFavorites(newFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(newFavorites));
  };

  const getAQILabel = (aqi: number) => {
    const labels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    return labels[aqi - 1] || "Unknown";
  };

  const getAQIColor = (aqi: number) => {
    const colors = ["#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8f3f97"];
    return colors[aqi - 1] || "#999";
  };

  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
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
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2>Advanced Weather Search</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getWeather()}
          />
          <button onClick={() => getWeather()} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>⭐ Favorite Cities</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {favorites.map((fav) => (
                <div key={fav} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "8px 12px",
                  background: theme === "dark" ? "#333" : "#f0f0f0",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}>
                  <span onClick={() => { setCity(fav); getWeather(fav); }}>{fav}</span>
                  <button
                    onClick={() => removeFromFavorites(fav)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ff4444",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        {loading && (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #3498db",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }} />
            <p style={{ marginTop: "20px" }}>Loading weather data...</p>
          </div>
        )}

        {weather && !loading && (
          <div className="weather-info" style={{ marginTop: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div className="weather-header">
                {weather.name}, {weather.sys?.country}
              </div>
              <button
                onClick={addToFavorites}
                disabled={favorites.includes(weather.name)}
                style={{
                  padding: "8px 16px",
                  background: favorites.includes(weather.name) ? "#ccc" : "#ffd700",
                  border: "none",
                  borderRadius: "8px",
                  cursor: favorites.includes(weather.name) ? "not-allowed" : "pointer",
                  fontSize: "16px",
                }}
              >
                {favorites.includes(weather.name) ? "⭐ Saved" : "⭐ Add to Favorites"}
              </button>
            </div>

            <div
              className="weather-main"
              style={
                weather.weather[0].main === "Clear"
                  ? { backgroundColor: "#ffd700", background: "linear-gradient(135deg, #ffd700, #ffed4e)" }
                  : weather.weather[0].main === "Rain"
                  ? { background: "linear-gradient(135deg, #667eea, #764ba2)" }
                  : weather.weather[0].main === "Clouds"
                  ? { background: "linear-gradient(135deg, #757F9A, #D7DDE8)" }
                  : { background: "linear-gradient(135deg, #334D50, #CBCAA5)" }
              }
            >
              <div style={{ padding: "20px", flex: 1 }}>
                <h1 style={{ fontSize: "4rem", margin: 0, color: "#fff" }}>
                  {Math.round(weather.main.temp)}°C
                </h1>
                <p style={{ fontSize: "1.2rem", color: "#fff", textTransform: "capitalize" }}>
                  {weather.weather[0].description}
                </p>
                <p style={{ color: "#fff", opacity: 0.9 }}>
                  Feels like {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
              <div className="img-container">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt={weather.weather[0].description}
                  width="200px"
                />
              </div>
            </div>

            {/* Detailed Weather Info Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "20px",
            }}>
              <div style={{
                padding: "20px",
                background: theme === "dark" ? "#2a2a2a" : "#f8f9fa",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
                <div style={{ fontSize: "2rem" }}>🌡️</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Temperature Range</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "5px" }}>
                  {Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°
                </div>
              </div>

              <div style={{
                padding: "20px",
                background: theme === "dark" ? "#2a2a2a" : "#f8f9fa",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
                <div style={{ fontSize: "2rem" }}>💧</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Humidity</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "5px" }}>
                  {weather.main.humidity}%
                </div>
              </div>

              <div style={{
                padding: "20px",
                background: theme === "dark" ? "#2a2a2a" : "#f8f9fa",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
                <div style={{ fontSize: "2rem" }}>🌬️</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Wind</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "5px" }}>
                  {weather.wind.speed} m/s {getWindDirection(weather.wind.deg)}
                </div>
              </div>

              <div style={{
                padding: "20px",
                background: theme === "dark" ? "#2a2a2a" : "#f8f9fa",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
                <div style={{ fontSize: "2rem" }}>🔭</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Visibility</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "5px" }}>
                  {(weather.visibility / 1000).toFixed(1)} km
                </div>
              </div>

              <div style={{
                padding: "20px",
                background: theme === "dark" ? "#2a2a2a" : "#f8f9fa",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
                <div style={{ fontSize: "2rem" }}>🌫️</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Pressure</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "5px" }}>
                  {weather.main.pressure} hPa
                </div>
              </div>

              <div style={{
                padding: "20px",
                background: theme === "dark" ? "#2a2a2a" : "#f8f9fa",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
                <div style={{ fontSize: "2rem" }}>☁️</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Cloudiness</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "5px" }}>
                  {weather.clouds.all}%
                </div>
              </div>
            </div>

            {/* Air Quality Section */}
            {airQuality && airQuality.list && airQuality.list[0] && (
              <div style={{
                marginTop: "20px",
                padding: "20px",
                background: theme === "dark" ? "#2a2a2a" : "#f8f9fa",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
                <h3 style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "2rem" }}>🌍</span>
                  Air Quality Index
                </h3>
                <div style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  backgroundColor: getAQIColor(airQuality.list[0].main.aqi),
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}>
                  {getAQILabel(airQuality.list[0].main.aqi)}
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "15px",
                  marginTop: "15px",
                }}>
                  <div>
                    <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>PM2.5</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      {airQuality.list[0].components.pm2_5.toFixed(1)} µg/m³
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>PM10</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      {airQuality.list[0].components.pm10.toFixed(1)} µg/m³
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>NO₂</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      {airQuality.list[0].components.no2.toFixed(1)} µg/m³
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>O₃</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      {airQuality.list[0].components.o3.toFixed(1)} µg/m³
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sun Times */}
            <div style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}>
              <div style={{
                padding: "20px",
                background: theme === "dark" ? "#2a2a2a" : "#f8f9fa",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "2rem" }}>🌅</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Sunrise</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "5px" }}>
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div style={{
                padding: "20px",
                background: theme === "dark" ? "#2a2a2a" : "#f8f9fa",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "2rem" }}>🌇</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Sunset</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "5px" }}>
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
