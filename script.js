const apiKey = '5a5b9db67354136d5ab2c73981bb2ded';
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
let city = 'faisalabad'
const lat = '';
const lon = '';
let url;

searchBtn.addEventListener('click', () => {
    city = searchBox.value
    fetchWeather()
})

// if (city) {
//     url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
// } else if (lat && lon) {
//     url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
// } else {
//     throw new Error('Either city name or latitude and longitude must be provided.');
// }

async function fetchWeather() {

    url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        var data = await response.json();
        // console.log(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = data.main.temp + '°c';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'Km/h';

}

fetchWeather();
