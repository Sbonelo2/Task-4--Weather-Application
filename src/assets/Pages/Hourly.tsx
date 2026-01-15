import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

type ForecastItem = {
  dt: number;
  main: { temp: number; humidity: number; feels_like: number; pressure: number };
  wind: { speed: number; deg: number };
  weather: { description: string; icon: string; main: string }[];
  pop: number; // Probability of precipitation
  clouds: { all: number };
};

type CityData = {
  name: string;
  country: string;
};

export default function Hourly() {
  const { theme } = useTheme();
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "today" | "tomorrow">("all");
  const [viewMode, setViewMode] = useState<"grid" | "chart">("grid");

  const API_KEY = "0c3c4537724ac48515517f438aa791cf";

  const getForecast = async () => {
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }

    try {
      setError("");
      setLoading(true);
      setForecast([]);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setForecast(data.list);
      setCityData({ name: data.city.name, country: data.city.country });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const getFilteredForecast = () => {
    if (filter === "all") return forecast;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    return forecast.filter(item => {
      const itemDate = new Date(item.dt * 1000);
      if (filter === "today") {
        return itemDate >= today && itemDate < tomorrow;
      } else if (filter === "tomorrow") {
        return itemDate >= tomorrow && itemDate < dayAfter;
      }
      return true;
    });
  };

  const filteredData = getFilteredForecast();
  const maxTemp = Math.max(...filteredData.map(f => f.main.temp));
  const minTemp = Math.min(...filteredData.map(f => f.main.temp));

  const themeStyles = {
    background: theme === "dark" ? "#1e1e1e" : "#ffffff",
    color: theme === "dark" ? "#f5f5f5" : "#000000",
    cardBackground: theme === "dark" ? "#2a2a2a" : "#f8f9fa",
    borderColor: theme === "dark" ? "#444" : "#ddd",
    inputBackground: theme === "dark" ? "#333" : "#fff",
    inputColor: theme === "dark" ? "#fff" : "#000",
  };

  return (
    <div className="forecast-container" style={{ 
      minHeight: "100vh", 
      paddingBottom: "40px",
      background: themeStyles.background,
      color: themeStyles.color
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "2rem" }}>
          ⏰ Hourly Weather Forecast
        </h2>
        
        <div className="search-box" style={{ marginBottom: "2rem" }}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getForecast()}
          />
          <button onClick={getForecast} disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {loading && (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #0077b6",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }} />
            <p style={{ marginTop: "20px" }}>Loading forecast data...</p>
          </div>
        )}

        {forecast.length > 0 && !loading && (
          <>
            {cityData && (
              <div style={{
                textAlign: "center",
                marginBottom: "2rem",
                padding: "20px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "12px",
                color: "white",
              }}>
                <h3 style={{ fontSize: "2rem", margin: 0 }}>
                  {cityData.name}, {cityData.country}
                </h3>
                <p style={{ margin: "10px 0 0 0", opacity: 0.9 }}>
                  5-Day Forecast • {forecast.length} data points
                </p>
              </div>
            )}

            {/* Filter and View Mode Controls */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "15px",
            }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setFilter("all")}
                  style={{
                    padding: "10px 20px",
                    background: filter === "all" ? "#0077b6" : "#e0e0e0",
                    color: filter === "all" ? "white" : "#333",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: filter === "all" ? "bold" : "normal",
                  }}
                >
                  All Days
                </button>
                <button
                  onClick={() => setFilter("today")}
                  style={{
                    padding: "10px 20px",
                    background: filter === "today" ? "#0077b6" : "#e0e0e0",
                    color: filter === "today" ? "white" : "#333",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: filter === "today" ? "bold" : "normal",
                  }}
                >
                  Today
                </button>
                <button
                  onClick={() => setFilter("tomorrow")}
                  style={{
                    padding: "10px 20px",
                    background: filter === "tomorrow" ? "#0077b6" : "#e0e0e0",
                    color: filter === "tomorrow" ? "white" : "#333",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: filter === "tomorrow" ? "bold" : "normal",
                  }}
                >
                  Tomorrow
                </button>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    padding: "10px 20px",
                    background: viewMode === "grid" ? "#0077b6" : "#e0e0e0",
                    color: viewMode === "grid" ? "white" : "#333",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  📊 Grid View
                </button>
                <button
                  onClick={() => setViewMode("chart")}
                  style={{
                    padding: "10px 20px",
                    background: viewMode === "chart" ? "#0077b6" : "#e0e0e0",
                    color: viewMode === "chart" ? "white" : "#333",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  📈 Chart View
                </button>
              </div>
            </div>

            {/* Temperature Range Summary */}
            <div style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "20px",
              background: "#f8f9fa",
              borderRadius: "12px",
              marginBottom: "2rem",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", color: "#ff6b6b" }}>🔥</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Max Temp</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ff6b6b" }}>
                  {Math.round(maxTemp)}°C
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", color: "#4dabf7" }}>❄️</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Min Temp</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4dabf7" }}>
                  {Math.round(minTemp)}°C
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem" }}>📍</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Data Points</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {filteredData.length}
                </div>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="forecast-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}>
                {filteredData.map((item, idx) => {
                  const date = new Date(item.dt * 1000);
                  const isNight = date.getHours() >= 20 || date.getHours() < 6;
                  
                  return (
                    <div
                      className="forecast-card"
                      key={idx}
                      style={{
                        background: isNight 
                          ? "linear-gradient(135deg, #2c3e50, #34495e)"
                          : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                        color: isNight ? "white" : "#333",
                        padding: "1.5rem",
                        borderRadius: "16px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                      }}
                    >
                      <div style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "10px" }}>
                        {date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "15px" }}>
                        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      
                      <div style={{ textAlign: "center", margin: "15px 0" }}>
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          alt={item.weather[0].description}
                          style={{ width: "80px", height: "80px" }}
                        />
                        <p style={{
                          textTransform: "capitalize",
                          fontWeight: "500",
                          margin: "5px 0",
                        }}>
                          {item.weather[0].description}
                        </p>
                      </div>

                      <div style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", margin: "15px 0" }}>
                        {Math.round(item.main.temp)}°C
                      </div>

                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        fontSize: "0.9rem",
                        marginTop: "15px",
                      }}>
                        <div>
                          <div style={{ opacity: 0.7 }}>Feels like</div>
                          <div style={{ fontWeight: "bold" }}>{Math.round(item.main.feels_like)}°C</div>
                        </div>
                        <div>
                          <div style={{ opacity: 0.7 }}>Humidity</div>
                          <div style={{ fontWeight: "bold" }}>{item.main.humidity}%</div>
                        </div>
                        <div>
                          <div style={{ opacity: 0.7 }}>Wind</div>
                          <div style={{ fontWeight: "bold" }}>{item.wind.speed} m/s</div>
                        </div>
                        <div>
                          <div style={{ opacity: 0.7 }}>Rain</div>
                          <div style={{ fontWeight: "bold" }}>{Math.round(item.pop * 100)}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}>
                <h3 style={{ marginBottom: "20px" }}>Temperature Chart</h3>
                <div style={{ position: "relative", height: "300px", marginBottom: "20px" }}>
                  <svg width="100%" height="100%" style={{ overflow: "visible" }}>
                    {/* Temperature line chart */}
                    {filteredData.map((item, idx) => {
                      if (idx === filteredData.length - 1) return null;
                      
                      const x1 = (idx / (filteredData.length - 1)) * 100;
                      const x2 = ((idx + 1) / (filteredData.length - 1)) * 100;
                      const y1 = 100 - ((item.main.temp - minTemp) / (maxTemp - minTemp)) * 80;
                      const y2 = 100 - ((filteredData[idx + 1].main.temp - minTemp) / (maxTemp - minTemp)) * 80;
                      
                      return (
                        <line
                          key={idx}
                          x1={`${x1}%`}
                          y1={`${y1}%`}
                          x2={`${x2}%`}
                          y2={`${y2}%`}
                          stroke="#0077b6"
                          strokeWidth="3"
                        />
                      );
                    })}
                    
                    {/* Data points */}
                    {filteredData.map((item, idx) => {
                      const x = (idx / (filteredData.length - 1)) * 100;
                      const y = 100 - ((item.main.temp - minTemp) / (maxTemp - minTemp)) * 80;
                      
                      return (
                        <g key={idx}>
                          <circle
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="5"
                            fill="#0077b6"
                          />
                          <text
                            x={`${x}%`}
                            y={`${y - 5}%`}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#333"
                          >
                            {Math.round(item.main.temp)}°
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
                
                {/* Time labels */}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", opacity: 0.7 }}>
                  {filteredData.filter((_, idx) => idx % Math.ceil(filteredData.length / 8) === 0).map((item, idx) => (
                    <div key={idx}>
                      {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
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
