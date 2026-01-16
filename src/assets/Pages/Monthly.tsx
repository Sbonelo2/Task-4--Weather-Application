import { useState } from "react";

type DailyItem = {
  dt: number;
  temp: { day: number; night: number; min: number; max: number; morn: number; eve: number };
  humidity: number;
  wind_speed: number;
  weather: { description: string; icon: string; main: string }[];
  pop: number;
  uvi: number;
  pressure: number;
  clouds: number;
};

type CityData = {
  name: string;
  country: string;
};

export default function Monthly() {
  const [city, setCity] = useState("");
  const [daily, setDaily] = useState<DailyItem[]>([]);
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "0c3c4537724ac48515517f438aa791cf";

  const getDailyForecast = async () => {
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }

    try {
      setError("");
      setLoading(true);
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
      setCityData({ name: geoData.name, country: geoData.sys.country });

      // Step 2: get daily forecast (One Call)
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      setDaily(data.daily || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred. Note: Daily forecast requires API subscription."
      );
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString([], { weekday: 'long' });
  };

  const getUVILevel = (uvi: number) => {
    if (uvi <= 2) return { label: "Low", color: "#00e400" };
    if (uvi <= 5) return { label: "Moderate", color: "#ffff00" };
    if (uvi <= 7) return { label: "High", color: "#ff7e00" };
    if (uvi <= 10) return { label: "Very High", color: "#ff0000" };
    return { label: "Extreme", color: "#8f3f97" };
  };

  return (
    <div className="forecast-container" style={{ minHeight: "100vh", paddingBottom: "40px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "2rem" }}>
          📅 7-Day Weather Forecast
        </h2>
        
        <div className="search-box" style={{ marginBottom: "2rem" }}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getDailyForecast()}
          />
          <button onClick={getDailyForecast} disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {error && <p className="error" style={{ textAlign: "center", fontSize: "1.1rem" }}>{error}</p>}

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
            <p style={{ marginTop: "20px" }}>Loading daily forecast...</p>
          </div>
        )}

        {cityData && daily.length > 0 && !loading && (
          <>
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
                {daily.length}-Day Extended Forecast
              </p>
            </div>

            <div className="forecast-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}>
              {daily.map((item, idx) => {
                const uviInfo = getUVILevel(item.uvi);
                
                return (
                  <div
                    className="forecast-card"
                    key={idx}
                    style={{
                      background: idx === 0 
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                      color: idx === 0 ? "white" : "#333",
                      padding: "1.5rem",
                      borderRadius: "16px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      border: idx === 0 ? "3px solid rgba(255,255,255,0.3)" : "none",
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
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      marginBottom: "15px",
                    }}>
                      <div>
                        <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                          {getDayName(item.dt)}
                        </div>
                        <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                          {new Date(item.dt * 1000).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt={item.weather[0].description}
                        style={{ width: "70px", height: "70px" }}
                      />
                    </div>

                    <div style={{ textTransform: "capitalize", fontSize: "1.1rem", fontWeight: "500", marginBottom: "15px" }}>
                      {item.weather[0].description}
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px",
                      background: idx === 0 ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.05)",
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>☀️ Day</div>
                        <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                          {Math.round(item.temp.day)}°
                        </div>
                      </div>
                      <div style={{ fontSize: "2rem", opacity: 0.5 }}>|</div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>🌙 Night</div>
                        <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                          {Math.round(item.temp.night)}°
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                      fontSize: "0.9rem",
                    }}>
                      <div>
                        <div style={{ opacity: 0.7 }}>🌡️ High/Low</div>
                        <div style={{ fontWeight: "bold" }}>
                          {Math.round(item.temp.max)}° / {Math.round(item.temp.min)}°
                        </div>
                      </div>
                      <div>
                        <div style={{ opacity: 0.7 }}>💧 Humidity</div>
                        <div style={{ fontWeight: "bold" }}>{item.humidity}%</div>
                      </div>
                      <div>
                        <div style={{ opacity: 0.7 }}>🌬️ Wind</div>
                        <div style={{ fontWeight: "bold" }}>{item.wind_speed.toFixed(1)} m/s</div>
                      </div>
                      <div>
                        <div style={{ opacity: 0.7 }}>🌧️ Rain</div>
                        <div style={{ fontWeight: "bold" }}>{Math.round(item.pop * 100)}%</div>
                      </div>
                      <div>
                        <div style={{ opacity: 0.7 }}>☁️ Clouds</div>
                        <div style={{ fontWeight: "bold" }}>{item.clouds}%</div>
                      </div>
                      <div>
                        <div style={{ opacity: 0.7 }}>🌫️ Pressure</div>
                        <div style={{ fontWeight: "bold" }}>{item.pressure} hPa</div>
                      </div>
                    </div>

                    {item.uvi !== undefined && (
                      <div style={{
                        marginTop: "15px",
                        padding: "10px",
                        background: idx === 0 ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.05)",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}>
                        <div style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "5px" }}>
                          ☀️ UV Index
                        </div>
                        <div style={{
                          display: "inline-block",
                          padding: "5px 15px",
                          borderRadius: "15px",
                          backgroundColor: uviInfo.color,
                          color: "white",
                          fontWeight: "bold",
                        }}>
                          {item.uvi.toFixed(1)} - {uviInfo.label}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
