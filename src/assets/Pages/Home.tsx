import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type WeatherData = {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number; feels_like: number };
  wind: { speed: number };
  weather: { description: string; icon: string; main: string }[];
};

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [favoriteWeathers, setFavoriteWeathers] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const API_KEY = "0c3c4537724ac48515517f438aa791cf";

  useEffect(() => {
    // Load favorites
    const saved = localStorage.getItem("favoriteCities");
    if (saved) {
      const favs = JSON.parse(saved);
      loadFavoriteWeathers(favs);
    }

    // Get current location weather
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
            );
            const data = await res.json();
            setCurrentWeather(data);
          } catch (error) {
            setLocationError("Unable to fetch weather for your location");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setLocationError("Location access denied. Please enable location services.");
          setLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
    }
  };

  const loadFavoriteWeathers = async (cities: string[]) => {
    const weatherPromises = cities.slice(0, 4).map(async (city) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&units=metric&appid=${API_KEY}`
        );
        return await res.json();
      } catch {
        return null;
      }
    });

    const results = await Promise.all(weatherPromises);
    setFavoriteWeathers(results.filter((w) => w !== null));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffffff",
      padding: "40px 20px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Hero Section */}
        <div style={{
          textAlign: "center",
          color: "#000",
          marginBottom: "40px",
          padding: "40px 20px",
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          border: "2px solid #000",
        }}>
          <h1 style={{ fontSize: "3.5rem", margin: "0 0 10px 0", fontWeight: "bold", color: "#000" }}>
            ☀️ Weather App
          </h1>
          <p style={{ fontSize: "1.5rem", color: "#333" }}>
            {getGreeting()}! Check the weather anywhere in the world
          </p>
        </div>

        {/* Current Location Weather */}
        {loading && (
          <div style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "40px",
            textAlign: "center",
            marginBottom: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            border: "2px solid #000",
          }}>
            <div style={{
              border: "4px solid #e0e0e0",
              borderTop: "4px solid #000",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }} />
            <p style={{ color: "#000" }}>Getting your location weather...</p>
          </div>
        )}

        {locationError && (
          <div style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "20px",
            textAlign: "center",
            marginBottom: "30px",
            color: "#000",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            border: "2px solid #000",
          }}>
            {locationError}
          </div>
        )}

        {currentWeather && !loading && (
          <div style={{
            background: "#000",
            borderRadius: "20px",
            padding: "40px",
            marginBottom: "40px",
            color: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            border: "2px solid #000",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <h2 style={{ fontSize: "2.5rem", margin: "0 0 10px 0" }}>
                  📍 Your Location
                </h2>
                <h3 style={{ fontSize: "2rem", margin: "0 0 10px 0", fontWeight: "normal" }}>
                  {currentWeather.name}, {currentWeather.sys.country}
                </h3>
                <p style={{ fontSize: "1.2rem", textTransform: "capitalize", opacity: 0.9 }}>
                  {currentWeather.weather[0].description}
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <img
                  src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                  alt={currentWeather.weather[0].description}
                  style={{ width: "150px", height: "150px" }}
                />
                <div style={{ fontSize: "4rem", fontWeight: "bold" }}>
                  {Math.round(currentWeather.main.temp)}°C
                </div>
                <div style={{ fontSize: "1.2rem", opacity: 0.9 }}>
                  Feels like {Math.round(currentWeather.main.feels_like)}°C
                </div>
              </div>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "20px",
              marginTop: "30px",
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem" }}>💧</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Humidity</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {currentWeather.main.humidity}%
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem" }}>🌬️</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Wind Speed</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {currentWeather.wind.speed} m/s
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Access Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          marginBottom: "40px",
        }}>
          <Link to="/weather" style={{ textDecoration: "none" }}>
            <div style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              border: "2px solid #000",
              color: "#000",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "15px" }}>🌤️</div>
              <h3 style={{ fontSize: "1.5rem", margin: "0 0 10px 0", color: "#000" }}>Current Weather</h3>
              <p style={{ margin: 0, color: "#666" }}>
                Get detailed weather information for any city
              </p>
            </div>
          </Link>

          <Link to="/hourly" style={{ textDecoration: "none" }}>
            <div style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              border: "2px solid #000",
              color: "#000",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "15px" }}>⏰</div>
              <h3 style={{ fontSize: "1.5rem", margin: "0 0 10px 0", color: "#000" }}>Hourly Forecast</h3>
              <p style={{ margin: 0, color: "#666" }}>
                View hour-by-hour weather predictions
              </p>
            </div>
          </Link>

          <Link to="/monthly" style={{ textDecoration: "none" }}>
            <div style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              border: "2px solid #000",
              color: "#000",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "15px" }}>📅</div>
              <h3 style={{ fontSize: "1.5rem", margin: "0 0 10px 0", color: "#000" }}>Daily Forecast</h3>
              <p style={{ margin: 0, color: "#666" }}>
                Check the weather for the next 7 days
              </p>
            </div>
          </Link>

          <Link to="/maps" style={{ textDecoration: "none" }}>
            <div style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              border: "2px solid #000",
              color: "#000",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "15px" }}>🗺️</div>
              <h3 style={{ fontSize: "1.5rem", margin: "0 0 10px 0", color: "#000" }}>Weather Maps</h3>
              <p style={{ margin: 0, color: "#666" }}>
                Interactive weather map with live data
              </p>
            </div>
          </Link>
        </div>

        {/* Favorite Cities Weather */}
        {favoriteWeathers.length > 0 && (
          <div style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            border: "2px solid #000",
          }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "25px", color: "#000" }}>
              ⭐ Your Favorite Cities
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}>
              {favoriteWeathers.map((weather, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#000",
                    borderRadius: "15px",
                    padding: "20px",
                    color: "white",
                    textAlign: "center",
                    border: "2px solid #000",
                  }}
                >
                  <h3 style={{ fontSize: "1.5rem", margin: "0 0 10px 0", color: "#fff" }}>
                    {weather.name}, {weather.sys.country}
                  </h3>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    style={{ width: "80px", height: "80px" }}
                  />
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "10px 0", color: "#fff" }}>
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <p style={{ textTransform: "capitalize", color: "#e0e0e0" }}>
                    {weather.weather[0].description}
                  </p>
                </div>
              ))}
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
