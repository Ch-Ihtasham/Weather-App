const apiKey = '5a5b9db67354136d5ab2c73981bb2ded';
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const locationBtn = document.querySelector('.location')
let weatherIcon = document.querySelector('.weather-icon')
let city;
let url;


searchBtn.addEventListener('click', () => {
    city = searchBox.value.trim()
    fetchWeather()
})


locationBtn.addEventListener('click', () => {


    getLocation((lat, lon) => {
        fetchWeather(lat, lon)
    });
    searchBox.value = ''

})


function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => callback(position.coords.latitude, position.coords.longitude),
            error => console.error('Error getting location:', error)
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}
getLocation((lat, lon) => {
    fetchWeather(lat, lon)
});

async function fetchWeather(lat, lon) {

    if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    }
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
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'Km/h';
    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png"
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png"
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png"
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png"
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png"
    }


}

fetchWeather();
