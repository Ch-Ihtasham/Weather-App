const apiKey = '5a5b9db67354136d5ab2c73981bb2ded'; 
const city='faisalabad'
const lat = ''; 
const lon = ''; 
let url;

if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
} else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
} else {
    throw new Error('Either city name or latitude and longitude must be provided.');
}

async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


fetchWeather();
