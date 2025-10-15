# ☀️  Weather Application

A modern, feature-rich weather application built with React, TypeScript, and Vite. Get comprehensive weather information with an intuitive and beautiful user interface.

![Weather App](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)

## ✨ Features

### 🏠 Home Dashboard
- **Current Location Weather**: Automatically detects and displays weather for your location
- **Quick Access Cards**: Navigate to different weather views with beautiful animated cards
- **Favorite Cities Widget**: Quick view of weather in your saved favorite cities
- **Personalized Greeting**: Dynamic greeting based on time of day

### 🌤️ Current Weather Page
- **Comprehensive Weather Data**:
  - Real-time temperature with "feels like" indicator
  - Temperature range (min/max)
  - Humidity and pressure
  - Wind speed and direction
  - Visibility and cloudiness
  - Sunrise and sunset times
  
- **Air Quality Index (AQI)**:
  - Real-time air quality monitoring
  - Detailed pollutant breakdown (PM2.5, PM10, NO₂, O₃)
  - Color-coded AQI levels (Good, Fair, Moderate, Poor, Very Poor)

- **Advanced Features**:
  - ⭐ Favorite cities management with localStorage persistence
  - 🌓 Dark/Light theme toggle
  - 🎨 Dynamic weather-based backgrounds
  - ⚡ Loading states with smooth animations

### ⏰ Hourly Forecast
- **5-Day Hourly Predictions**: Weather data every 3 hours
- **Multiple View Modes**:
  - 📊 Grid View: Detailed cards with all weather metrics
  - 📈 Chart View: Visual temperature trend line chart
  
- **Smart Filtering**:
  - View all days
  - Filter by today only
  - Filter by tomorrow only
  
- **Detailed Metrics**:
  - Temperature and "feels like"
  - Humidity and wind speed
  - Probability of precipitation
  - Day/Night visual indicators

### 📅 Daily Forecast (7-Day)
- **Extended Forecast**: Up to 7 days ahead
- **Comprehensive Daily Data**:
  - Day and night temperatures
  - Temperature range (high/low)
  - Morning and evening temperatures
  - UV Index with color-coded levels
  - Precipitation probability
  - Cloud coverage and pressure
  
- **Smart Day Labels**: "Today", "Tomorrow", or day name
- **Highlighted Current Day**: Special styling for today's forecast

### 🗺️ Interactive Weather Map
- **Real-time Map Integration**: Powered by Leaflet and OpenStreetMap
- **Multiple Location Methods**:
  - Automatic current location detection
  - City search functionality
  - Click anywhere on map for weather
  
- **Rich Popups**: Detailed weather info for any location
- **Smooth Map Navigation**: Pan, zoom, and explore

### 🎨 UI/UX Enhancements
- **Modern Gradient Design**: Beautiful purple-blue gradient theme
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects, loading spinners, transitions
- **Active Navigation**: Highlighted current page in navbar
- **Intuitive Icons**: Weather-appropriate emojis and icons
- **Error Handling**: User-friendly error messages

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task-4--Weather-Application-6
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🔑 API Configuration

This app uses the OpenWeatherMap API. The API key is included in the code for demonstration purposes.

For production use, you should:
1. Get your own API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Store it in environment variables
3. Replace the hardcoded API keys in the component files

**Note**: Some features (like 7-day forecast) require a paid API subscription.

## 📦 Tech Stack

- **React 19.1.1**: Modern React with hooks
- **TypeScript 5.8.3**: Type-safe development
- **Vite 7.1.7**: Lightning-fast build tool
- **React Router DOM 7.9.2**: Client-side routing
- **Leaflet 1.9.4**: Interactive maps
- **React Leaflet 5.0.0**: React components for Leaflet
- **OpenWeatherMap API**: Weather data provider

## 📁 Project Structure

```
src/
├── assets/
│   └── Pages/
│       ├── Home.tsx          # Dashboard with location weather
│       ├── Weather.tsx       # Current weather with AQI
│       ├── Hourly.tsx        # Hourly forecast with charts
│       ├── Monthly.tsx       # 7-day forecast
│       └── Maps.tsx          # Interactive weather map
├── Components/
│   ├── NavBar.tsx           # Navigation with active states
│   └── Footer.tsx           # Footer component
├── App.tsx                  # Main app with routing
├── App.css                  # Global styles
└── main.tsx                 # Entry point
```

## 🎯 Key Features Implementation

### Favorite Cities
- Stored in browser's localStorage
- Persist across sessions
- Quick access from home page
- One-click weather lookup

### Theme Toggle
- Light and dark modes
- Smooth transitions
- Persists user preference

### Loading States
- Animated spinners
- Prevents multiple requests
- User-friendly feedback

### Error Handling
- Network error messages
- Invalid city handling
- API error responses
- Graceful degradation

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and modern web technologies.

## 🔮 Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Weather radar overlay on maps
- [ ] Multiple language support
- [ ] Weather widgets for embedding
- [ ] PWA support for offline access
- [ ] Social sharing features
- [ ] Weather comparison between cities
