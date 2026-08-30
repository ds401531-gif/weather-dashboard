// OpenWeatherMap API Configuration
const API_KEY = 'b6fd43b49afee34357f6809ce46052f3'; // Free API Key (limited requests)
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const currentWeatherCard = document.getElementById('currentWeatherCard');
const forecastContainer = document.getElementById('forecastContainer');
const detailsContainer = document.getElementById('detailsContainer');

// Weather Icons Mapping
const weatherIcons = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '🌤️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️'
};

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
        searchInput.value = '';
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeather(city);
            searchInput.value = '';
        }
    }
});

// Fetch weather data
function fetchWeather(city) {
    currentWeatherCard.classList.add('loading');
    currentWeatherCard.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading weather data for ${city}...</p>
    `;

    // Fetch current weather
    fetch(`${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
            // Fetch 5-day forecast using coordinates
            return fetch(`${API_BASE_URL}/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}&units=metric`);
        })
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            showError(`Error: ${error.message}`);
        });
}

// Display current weather
function displayCurrentWeather(data) {
    const { name, sys, main, weather, wind, clouds, visibility } = data;
    const icon = weatherIcons[weather[0].icon] || '🌤️';
    const temp = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const description = weather[0].description;

    currentWeatherCard.classList.remove('loading');
    currentWeatherCard.innerHTML = `
        <div class="weather-header">
            <div>
                <div class="city-name">${name}, ${sys.country}</div>
                <div class="weather-description">${description}</div>
            </div>
            <div class="weather-icon">${icon}</div>
        </div>
        <div class="temperature">${temp}°C</div>
        <div class="weather-details">
            <div class="detail-item">
                <div class="detail-label">Feels Like</div>
                <div class="detail-value">${feelsLike}°C</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Humidity</div>
                <div class="detail-value">${main.humidity}%</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Wind Speed</div>
                <div class="detail-value">${Math.round(wind.speed)} m/s</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Pressure</div>
                <div class="detail-value">${main.pressure} hPa</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Visibility</div>
                <div class="detail-value">${(visibility / 1000).toFixed(1)} km</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Cloud Coverage</div>
                <div class="detail-value">${clouds.all}%</div>
            </div>
        </div>
    `;
}

// Display 5-day forecast
function displayForecast(data) {
    const forecasts = {};

    // Group forecasts by day
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!forecasts[date]) {
            forecasts[date] = [];
        }
        forecasts[date].push(item);
    });

    // Get next 5 days (one forecast per day - midday)
    const forecastDays = Object.entries(forecasts).slice(0, 5);

    forecastContainer.innerHTML = '';
    forecastDays.forEach(([date, dayForecasts]) => {
        // Get the midday forecast (12:00 PM)
        const middayForecast = dayForecasts.find(f => {
            const hour = new Date(f.dt * 1000).getHours();
            return hour === 12;
        }) || dayForecasts[Math.floor(dayForecasts.length / 2)];

        const temp = Math.round(middayForecast.main.temp);
        const tempMin = Math.round(middayForecast.main.temp_min);
        const tempMax = Math.round(middayForecast.main.temp_max);
        const description = middayForecast.weather[0].description;
        const icon = weatherIcons[middayForecast.weather[0].icon] || '🌤️';
        const dayName = new Date(middayForecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-date">${dayName}</div>
            <div class="forecast-icon">${icon}</div>
            <div class="forecast-temp">${temp}°C</div>
            <div class="forecast-desc">${description}</div>
            <div class="forecast-range">${tempMin}° / ${tempMax}°</div>
        `;
        forecastContainer.appendChild(card);
    });
}

// Display additional details
function displayDetails(data) {
    const { main, wind, clouds, sys } = data;
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    detailsContainer.innerHTML = `
        <div class="details-card">
            <h3>Max Temperature</h3>
            <p>${Math.round(main.temp_max)}°C</p>
        </div>
        <div class="details-card">
            <h3>Min Temperature</h3>
            <p>${Math.round(main.temp_min)}°C</p>
        </div>
        <div class="details-card">
            <h3>Humidity</h3>
            <p>${main.humidity}%</p>
        </div>
        <div class="details-card">
            <h3>Wind Gust</h3>
            <p>${Math.round(wind.gust || wind.speed)} m/s</p>
        </div>
        <div class="details-card">
            <h3>Sunrise</h3>
            <p>${sunrise}</p>
        </div>
        <div class="details-card">
            <h3>Sunset</h3>
            <p>${sunset}</p>
        </div>
    `;
}

// Show error message
function showError(message) {
    currentWeatherCard.classList.remove('loading');
    currentWeatherCard.innerHTML = `
        <div class="error-message">${message}</div>
    `;
    forecastContainer.innerHTML = '';
    detailsContainer.innerHTML = '';
}

// Load default city on page load
window.addEventListener('load', () => {
    fetchWeather('New York');
});