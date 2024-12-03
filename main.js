
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = `7b64b21817d23c1d490795d24f3fdad3`;
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === "404") {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            const weatherCondition = json.weather[0].main.toLowerCase();

            switch (weatherCondition) {
                case 'clear':
                    image.src = 'images/clear.png';
                    break;
                case 'rain':
                    image.src = 'images/rain.png';
                    break;
                case 'snow':
                    image.src = 'images/snow.png';
                    break;
                case 'clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'mist':
                case 'haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${parseInt(json.wind.speed)}Km/h`;

            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
        })
        .catch(err => console.error('Error fetching weather data:', err));
});
