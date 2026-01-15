# ☀️ Advanced Weather Application

A cutting-edge, feature-rich weather application built with React 19, TypeScript, and Vite. Experience comprehensive weather intelligence with an intuitive, beautiful, and responsive user interface that delivers real-time atmospheric data and advanced forecasting capabilities.

![Weather App](https://img.shields.io/badge/React-19.1.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff)
![License](https://img.shields.io/badge/License-MIT-green)

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

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: Version 18.0.0 or higher (recommended: LTS)
- **npm**: Version 9.0.0 or higher OR **yarn**: Version 1.22.0 or higher
- **Git**: For version control and cloning
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Installation & Setup

1. **Clone the repository**
   ```bash
   # Clone the repository using HTTPS
   git clone https://github.com/Sbonelo2/Task-4--Weather-Application.git
   
   # Navigate into the project directory
   cd Task-4--Weather-Application
   ```

2. **Install dependencies**
   ```bash
   # Using npm (recommended)
   npm install
   
   # Or using yarn
   yarn install
   ```

3. **Environment Configuration (Optional)**
   ```bash
   # Create environment file for production
   cp .env.example .env
   
   # Add your OpenWeatherMap API key
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Or using yarn
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting (code quality checks)
npm run lint

# Type checking
npm run type-check
```

### Production Deployment

```bash
# Build optimized production version
npm run build

# Deploy the 'dist' folder to your hosting service
# The dist folder contains all optimized assets
```

## 🔑 API Configuration & Setup

### OpenWeatherMap API Integration

This application leverages the OpenWeatherMap API for comprehensive weather data. The API key is included for demonstration purposes, but for production deployment, you should configure your own.

#### Getting Your API Key

1. **Sign up for OpenWeatherMap**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Create a free account
   - Verify your email address

2. **Choose Your Plan**
   - **Free Plan**: Current weather, 5-day forecast, limited calls per minute
   - **Professional Plan**: Extended forecasts, weather alerts, higher rate limits

3. **Configure Your API Key**
   
   **Option 1: Environment Variables (Recommended for Production)**
   ```bash
   # Create .env file in root directory
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```
   
   **Option 2: Direct Configuration (Development Only)**
   Update the API key in each component file:
   - `src/assets/Pages/Home.tsx`
   - `src/assets/Pages/Weather.tsx`
   - `src/assets/Pages/Hourly.tsx`
   - `src/assets/Pages/Monthly.tsx`
   - `src/assets/Pages/Maps.tsx`

#### API Endpoints Used

- **Current Weather**: `/data/2.5/weather`
- **5-Day Forecast**: `/data/2.5/forecast`
- **Air Quality**: `/data/2.5/air_pollution`
- **Daily Forecast**: `/data/2.5/forecast/daily` (requires paid plan)

#### Rate Limits & Best Practices

- **Free Plan**: 60 calls/minute, 1,000,000 calls/month
- **Caching**: Implement local caching to reduce API calls
- **Error Handling**: Graceful degradation when API limits are reached
- **Security**: Never expose API keys in client-side code in production

## 📦 Advanced Tech Stack

### Core Framework & Libraries
- **React 19.1.1**: Latest React with concurrent features and hooks
- **TypeScript 5.8.3**: Strict type-checking and enhanced developer experience
- **Vite 7.1.7**: Ultra-fast build tool with HMR and optimized bundling
- **React Router DOM 7.9.2**: Modern client-side routing with lazy loading

### Mapping & Geolocation
- **Leaflet 1.9.4**: Open-source interactive maps
- **React Leaflet 5.0.0**: React components for Leaflet integration
- **HTML5 Geolocation API**: Browser-based location services

### Data & APIs
- **OpenWeatherMap API**: Comprehensive weather data and forecasts
- **Fetch API**: Modern HTTP requests with error handling
- **LocalStorage API**: Client-side data persistence

### Development Tools
- **ESLint 9.36.0**: Code quality and linting
- **TypeScript Compiler**: Type checking and compilation
- **Vite Dev Server**: Hot module replacement and fast refresh

## 📁 Advanced Project Architecture

```
weather-app/
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── vite.config.ts           # Vite build configuration
│   ├── tsconfig.json            # TypeScript compiler options
│   ├── tsconfig.app.json        # App-specific TypeScript config
│   ├── tsconfig.node.json       # Node.js TypeScript config
│   ├── eslint.config.js         # ESLint linting rules
│   ├── index.html               # Main HTML template
│   └── .gitignore               # Git ignore patterns
│
├── 📁 src/                      # Source code directory
│   ├── 📁 assets/
│   │   ├── 📁 Pages/            # Page components
│   │   │   ├── Home.tsx         # Dashboard with location weather & favorites
│   │   │   ├── Weather.tsx      # Current weather with AQI & theme toggle
│   │   │   ├── Hourly.tsx       # Hourly forecast with charts & filtering
│   │   │   ├── Monthly.tsx      # 7-day forecast with UV index
│   │   │   └── Maps.tsx         # Interactive weather map
│   │   └── 📁 img/              # Static images and assets
│   │
│   ├── 📁 Components/           # Reusable UI components
│   │   ├── NavBar.tsx           # Navigation with active states
│   │   ├── Footer.tsx           # Footer component
│   │   └── city.tsx             # City-related utilities
│   │
│   ├── 📄 App.tsx               # Main application component with routing
│   ├── 📄 App.css               # Global styles and CSS variables
│   ├── 📄 main.tsx              # React application entry point
│   └── 📄 index.css             # Base CSS reset and typography
│
├── 📁 public/                   # Static public assets
│   └── 📄 favicon.ico           # Application favicon
│
├── 📁 node_modules/             # Installed dependencies
├── 📁 dist/                     # Production build output (generated)
└── 📄 README.md                 # Project documentation
```

### Component Architecture

#### Page Components Structure
- **Home Page**: Location-based weather + favorites dashboard
- **Weather Page**: Detailed current weather + AQI monitoring
- **Hourly Page**: 5-day forecast with grid/chart views
- **Monthly Page**: 7-day extended forecast with comprehensive metrics
- **Maps Page**: Interactive map with weather overlays

#### Shared Components
- **Navigation**: Active state management + responsive design
- **Footer**: Application information + links
- **Utilities**: City management + helper functions

## 🎯 Advanced Features Implementation

### 🌟 Favorite Cities System
- **LocalStorage Persistence**: Cities saved in browser storage
- **Cross-Session Retention**: Favorites persist between browser sessions
- **Quick Access Widgets**: One-click weather lookup from dashboard
- **Add/Remove Functionality**: Dynamic favorite management
- **Error Handling**: Graceful handling of invalid city names

### 🌓 Theme Management
- **Light/Dark Modes**: Complete theme switching system
- **Smooth Transitions**: CSS transitions for theme changes
- **Persistent Preferences**: User choice saved in localStorage
- **Dynamic Styling**: Theme-aware component rendering
- **Accessibility**: High contrast support for better readability

### ⚡ Performance Optimizations
- **Loading States**: Animated spinners and skeleton screens
- **Request Debouncing**: Prevent multiple API calls
- **Error Boundaries**: Graceful error handling and recovery
- **Component Memoization**: Optimized re-renders
- **Lazy Loading**: Efficient code splitting

### 🔄 Data Management
- **API Caching**: Reduce redundant network requests
- **Local Storage**: Persistent user preferences and favorites
- **State Management**: Efficient React state patterns
- **Error Recovery**: Automatic retry mechanisms
- **Data Validation**: Type-safe API response handling

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with breakpoints
- **Micro-interactions**: Hover effects and smooth animations
- **Loading Feedback**: Visual indicators for async operations
- **Error Messages**: User-friendly error notifications
- **Accessibility**: ARIA labels and keyboard navigation

## 🌐 Browser Compatibility & Performance

### Supported Browsers
- **Chrome**: 90+ (recommended for best performance)
- **Firefox**: 88+ (full feature support)
- **Safari**: 14+ (including iOS Safari)
- **Edge**: 90+ (Chromium-based Edge)
- **Mobile Browsers**: Full responsive support

### Performance Metrics
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.0 seconds

### Progressive Enhancement
- **Core Features**: Work without JavaScript disabled
- **Enhanced Features**: Maps, animations, and real-time updates
- **Graceful Degradation**: Fallbacks for older browsers
- **Offline Support**: Basic functionality with service worker (future)

## 🛠️ Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Consistent code formatting and quality
- **Component Structure**: Functional components with hooks
- **File Naming**: PascalCase for components, camelCase for utilities

### Best Practices
- **Error Boundaries**: Catch and handle React errors gracefully
- **Loading States**: Always show loading indicators for async operations
- **Accessibility**: ARIA labels and semantic HTML
- **Performance**: Memoization and lazy loading where appropriate

### Testing Strategy
- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: API integration and data flow
- **E2E Tests**: Critical user journeys (planned)
- **Performance Tests**: Bundle size and load times

## 📝 License & Legal

### MIT License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses
- **OpenWeatherMap API**: Terms of service apply
- **Leaflet**: BSD 2-Clause License
- **React**: MIT License
- **Other Dependencies**: Respective open-source licenses

### Usage Restrictions
- **API Keys**: Must comply with OpenWeatherMap terms
- **Commercial Use**: Check individual license terms
- **Attribution**: Keep license notices intact

## 🤝 Contributing Guidelines

### How to Contribute
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Standards
- **Code Quality**: Follow existing patterns and conventions
- **Testing**: Add tests for new features
- **Documentation**: Update README and inline comments
- **Performance**: Consider impact on bundle size and load times

### Issue Reporting
- **Bug Reports**: Use the issue template with detailed steps
- **Feature Requests**: Describe use case and expected behavior
- **Security Issues**: Report privately to maintainers

## 👨‍💻 Development Team

Built with ❤️ by the Weather App Development Team using cutting-edge web technologies and modern development practices.

### Core Technologies Expertise
- **React Ecosystem**: Hooks, Context API, Performance Optimization
- **TypeScript**: Advanced type systems and generic programming
- **Modern CSS**: Grid, Flexbox, CSS Variables, Animations
- **API Integration**: RESTful APIs, Error Handling, Caching Strategies
- **Mapping Technologies**: Leaflet, Geolocation APIs, Spatial Data

## 🔮 Roadmap & Future Enhancements

### 🚀 Upcoming Features (v2.0)
- [ ] **Weather Alerts**: Real-time severe weather notifications
- [ ] **Historical Data**: Weather trends and historical comparisons
- [ ] **Weather Radar**: Doppler radar overlay on interactive maps
- [ ] **Multi-language Support**: Internationalization (i18n)
- [ ] **PWA Features**: Offline support and installable app
- [ ] **Social Sharing**: Share weather updates on social media
- [ ] **Weather Comparison**: Side-by-side city weather comparisons
- [ ] **Advanced Charts**: Historical weather data visualization

### 🎯 Long-term Vision
- [ ] **Machine Learning**: Personalized weather predictions
- [ ] **IoT Integration**: Smart home weather automation
- [ ] **Voice Commands**: Voice-activated weather queries
- [ ] **Wearables**: Apple Watch and Android Wear support
- [ ] **API Marketplace**: Third-party weather data integrations

---

## 📞 Support & Contact

### Getting Help
- **Documentation**: This README and inline code comments
- **Issues**: GitHub Issues for bug reports and feature requests
- **Community**: Join our Discord/Slack community (coming soon)
- **Email**: support@weatherapp.com (for enterprise inquiries)

### Quick Links
- **Live Demo**: [https://weather-app-demo.com](https://weather-app-demo.com)
- **API Documentation**: [OpenWeatherMap API Docs](https://openweathermap.org/api)
- **React Documentation**: [React 19 Docs](https://react.dev/)
- **TypeScript Handbook**: [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

**⭐ Star this repository if you find it helpful!**

*Last updated: January 2026*

<img src="https://socialify.git.ci/Sbonelo2/Task-4--Weather-Application/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Task-4--Weather-Application" width="640" height="320" />
