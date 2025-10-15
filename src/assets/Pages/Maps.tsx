import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";


function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 8);
  return null;
}

// Component to handle map clicks
function LocationMarker({
  setClickWeather,
  API_KEY,
}: {
  setClickWeather: (data: any) => void;
  API_KEY: string;
}) {
  const [pos, setPos] = useState<[number, number] | null>(null);

  useMapEvents({
    click: async (e) => {
      const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPos(coords);

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();

        setClickWeather({
          lat: coords[0],
          lon: coords[1],
          city: data.name || "Unknown",
          country: data.sys?.country || "",
          temp: data.main?.temp,
          desc: data.weather?.[0]?.description,
          icon: data.weather?.[0]?.icon,
          humidity: data.main?.humidity,
          wind: data.wind?.speed,
        });
      } catch {
        setClickWeather(null);
      }
    },
  });

  return pos ? (
    <Marker position={pos}>
      <Popup>📍 Fetching weather...</Popup>
    </Marker>
  ) : null;
}

export default function WeatherMap() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [myWeather, setMyWeather] = useState<any>(null);

  const [search, setSearch] = useState("");
  const [searchPos, setSearchPos] = useState<[number, number] | null>(null);
  const [searchWeather, setSearchWeather] = useState<any>(null);

  const [clickWeather, setClickWeather] = useState<any>(null);

  const [error, setError] = useState("");

  const API_KEY = "0c3c4537724ac48515517f438aa791cf";

  // Get current location + weather
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setPosition(coords);

        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=metric&appid=${API_KEY}`
          );
          const data = await res.json();
          setMyWeather({
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            wind: data.wind.speed,
          });
        } catch {
          setError("Unable to fetch weather for your location");
        }
      },
      () => {
        setError("Unable to fetch current location");
      }
    );
  }, []);

  // Search for city + weather
  const searchLocation = async () => {
    if (!search.trim()) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          search
        )}&limit=1&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.length === 0) throw new Error("City not found");

      const { lat, lon, name, country } = data[0];
      setSearchPos([lat, lon]);

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherRes.json();

      setSearchWeather({
        city: name,
        country,
        temp: weatherData.main.temp,
        desc: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        humidity: weatherData.main.humidity,
        wind: weatherData.wind.speed,
      });

      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h2 style={{ textAlign: "center" }}>🌍 Weather Map</h2>

      {/* Search Input */}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a city"
          style={{ padding: "0.5rem", width: "250px", marginRight: "10px" }}
          onKeyDown={(e) => e.key === "Enter" && searchLocation()}
        />
        <button onClick={searchLocation}>Search</button>
      </div>

      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      <MapContainer
        center={(position || [0, 0]) as [number, number]}
        zoom={5}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {position && myWeather && (
          <Marker position={position}>
            <Popup>
              <strong>
                📍 {myWeather.city}, {myWeather.country}
              </strong>
              <br />
              <img
                src={`https://openweathermap.org/img/wn/${myWeather.icon}@2x.png`}
                alt={myWeather.desc}
              />
              <br />
              🌡 {myWeather.temp}°C <br />
              🌥 {myWeather.desc} <br />
              💧 {myWeather.humidity}% humidity <br />
              💨 {myWeather.wind} m/s wind
            </Popup>
          </Marker>
        )}

        {searchPos && searchWeather && (
          <>
            <ChangeView center={searchPos} />
            <Marker position={searchPos}>
              <Popup>
                <strong>
                  📍 {searchWeather.city}, {searchWeather.country}
                </strong>
                <br />
                <img
                  src={`https://openweathermap.org/img/wn/${searchWeather.icon}@2x.png`}
                  alt={searchWeather.desc}
                />
                <br />
                🌡 {searchWeather.temp}°C <br />
                🌥 {searchWeather.desc} <br />
                💧 {searchWeather.humidity}% humidity <br />
                💨 {searchWeather.wind} m/s wind
              </Popup>
            </Marker>
          </>
        )}

       
        <LocationMarker setClickWeather={setClickWeather} API_KEY={API_KEY} />

        {clickWeather && (
          <Marker position={[clickWeather.lat, clickWeather.lon]}>
            <Popup>
              <strong>
                📍 {clickWeather.city}, {clickWeather.country}
              </strong>
              <br />
              <img
                src={`https://openweathermap.org/img/wn/${clickWeather.icon}@2x.png`}
                alt={clickWeather.desc}
              />
              <br />
              🌡 {clickWeather.temp}°C <br />
              🌥 {clickWeather.desc} <br />
              💧 {clickWeather.humidity}% humidity <br />
              💨 {clickWeather.wind} m/s wind
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
