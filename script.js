const apiKey = '5a5b9db67354136d5ab2c73981bb2ded';
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const locationBtn = document.querySelector('.location');
let weatherIcon = document.querySelector('.weather-icon');
let city;
let url;

// Fetch weather on pressing Enter in search box
searchBox.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        city = searchBox.value.trim();
        if (city) {
            fetchWeather();
        } else {
            alert("Please enter a valid city name.");
        }
    }
});

// Fetch weather on clicking the search button
searchBtn.addEventListener('click', () => {
    city = searchBox.value.trim();
    if (city) {
        fetchWeather();
    } else {
        alert("Please enter a valid city name.");
    }
});

// Fetch weather using the current location on clicking the location button
locationBtn.addEventListener('click', () => {
    getLocation((lat, lon) => {
        fetchWeather(lat, lon);
    });
    searchBox.value = ''; // Clear the search box after using location
});

// Function to get user's current latitude and longitude
function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => callback(position.coords.latitude, position.coords.longitude),
            error => {
                console.error('Error getting location:', error);
                alert('Unable to retrieve your location. Please allow location access and try again.');
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Fetch weather data based on either city name or latitude and longitude
async function fetchWeather(lat, lon) {
    if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
    } else if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    } else {
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Log the weather condition for debugging
        console.log("Weather Condition:", data.weather[0].main);

        // Update DOM with fetched data
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' Km/h';

        // Standardize the weather condition by converting to lowercase
        const weatherCondition = data.weather[0].main.toLowerCase();
        console.log('Standardized Weather Condition:', weatherCondition);

        // Update weather icon based on condition
        if (weatherCondition === "clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition === "clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition === "rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition === "drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition === "mist") {
            weatherIcon.src = "images/mist.png";
        } else if (weatherCondition === "haze") {
            weatherIcon.src = "images/mist.png";
        }
        else {
            weatherIcon.src = "images/default.png"; // Fallback for other conditions
        }

    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to fetch weather data. Please check your city name or try again later.');
    }
}

// Call getLocation() and fetch the weather on page load
window.onload = function () {
    getLocation((lat, lon) => {
        fetchWeather(lat, lon);
    });
};
