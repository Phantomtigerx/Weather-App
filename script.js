var apiKey = "80568bb9501dc540070bdeeb3450a2ce";

function searchCity() {
    const city = document.getElementById('city-search').value;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const currentWeather = {
                name: data.name,
                date: new Date().toLocaleDateString(),
                icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                temperature: `${data.main.temp}°C`,
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} m/s`
            };

            document.getElementById('current-weather').innerHTML = `
                <h2>${currentWeather.name} (${currentWeather.date})</h2>
                <img src="${currentWeather.icon}" alt="weather icon">
                <p>Temperature: ${currentWeather.temperature}</p>
                <p>Humidity: ${currentWeather.humidity}</p>
                <p>Wind Speed: ${currentWeather.windSpeed}</p>
            `;

            
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    let forecastHtml = '<h2>5-day forecast</h2>';
                    for (let i = 0; i < data.list.length; i += 8) {
                        const day = data.list[i];
                        forecastHtml += `
                            <div>
                                <h3>${new Date(day.dt_txt).toLocaleDateString()}</h3>
                                <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="weather icon">
                                <p>Temperature: ${day.main.temp}°C</p>
                                <p>Wind Speed: ${day.wind.speed} m/s</p>
                                <p>Humidity: ${day.main.humidity}%</p>
                            </div>
                        `;
                    }
                    document.getElementById('forecast').innerHTML = forecastHtml;
                });
        });

    
    document.getElementById('search-history').innerHTML += `
        <p onclick="document.getElementById('city-search').value='${city}'; searchCity();">${city}</p>
    `;
}
