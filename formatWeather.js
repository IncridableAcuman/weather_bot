module.exports = function formatWeather(data) {
  return `
    🌤 *Weather information* (${data.name},${data.sys.country})

    🌡Temperature: ${(data.main.temp - 273.15).toFixed(1)} °C  
    💧Humidity: ${data.main.humidity} %
    💨Wind Speed: ${data.wind.speed} m/s
    ⛅️Weather conditions: ${data.weather[0].description}

    Coordinates: [${data.coord.lon},${data.coord.lat}]
    `;
};
