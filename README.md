# Weather Dashboard

A modern, responsive weather dashboard application that fetches real-time weather data from the OpenWeatherMap API.

## Features

- 🌍 **Search by City**: Find weather information for any city in the world
- 🌡️ **Current Weather**: Display current temperature, weather condition, and "feels like" temperature
- 📊 **Weather Details**: View humidity, wind speed, pressure, visibility, and cloud coverage
- 📅 **5-Day Forecast**: See weather predictions for the next 5 days
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Real-time Data**: Fetches live weather data from OpenWeatherMap API
- 🎨 **Beautiful UI**: Modern gradient background with smooth animations and intuitive interface
- ⌨️ **Keyboard Support**: Press Enter to search for a city

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Responsive layout with flexbox and grid
- **JavaScript (ES6+)**: Async/await for API calls
- **OpenWeatherMap API**: Free tier for weather data

## API Information

This project uses the **OpenWeatherMap API** (free tier):
- Endpoint: `https://api.openweathermap.org/data/2.5`
- Current weather and forecast data
- Temperature in Celsius
- Includes metrics: temperature, humidity, wind speed, pressure, visibility, and more

## How to Use

1. Open `index.html` in your web browser
2. The dashboard loads with New York weather by default
3. Use the search box to find weather for any city:
   - Type a city name
   - Click "Search" or press Enter
4. View the current weather, 5-day forecast, and additional details

## Project Structure

```
weather-dashboard/
├── index.html      # Main HTML file
├── style.css       # CSS styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Weather Icons

The dashboard uses emoji icons to represent different weather conditions:
- ☀️ Sunny
- 🌙 Night/Clear
- ⛅ Partly Cloudy
- ☁️ Cloudy
- 🌧️ Rainy
- 🌦️ Partly Rainy
- ⛈️ Thunderstorm
- ❄️ Snowy
- 🌫️ Foggy

## Features Breakdown

### Current Weather Display
- City name and country code
- Large temperature display
- Weather condition description
- "Feels like" temperature
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Visibility distance
- Cloud coverage percentage

### 5-Day Forecast
- Day of the week
- Weather icon
- Midday temperature
- Weather description
- Temperature range (min/max)

### Additional Details
- Maximum temperature
- Minimum temperature
- Humidity level
- Wind gust speed
- Sunrise time
- Sunset time

## Limitations

- Free API tier has rate limits (60 calls/minute)
- May experience delays with high traffic
- Some features available only with paid API tier

## Future Enhancements

- Add city autocomplete suggestions
- Save favorite cities
- Display air quality index (AQI)
- Show weather alerts
- Dark/Light mode toggle
- Hourly forecast
- Weather maps integration
- Multiple language support

## License

This project is open source and available under the MIT License.

## Credits

Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
