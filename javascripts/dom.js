function buildCurrentWeather (weatherData) {
  let domString = '';
  domString += `<h2>Weather for ${weatherData.name}</h2>`;
  domString += `<h2>Temperature: <strong class=''>${weatherData.main.temp}</strong>&#176;F</h2>`;
  domString += `<h2>High: ${weatherData.main.temp_max}&#176;F</2>`;
  domString += `<h2>Low: ${weatherData.main.temp_min}&#176;F</h2>`;
  domString += `<h2>Humidity: ${weatherData.main.humidity}%</h2>`;
  domString += `<h2 class='text-capitalize'>${weatherData.weather[0].description}</h2>`;
  domString += `<h2>Air Pressure: ${weatherData.main.pressure} hpa</h2>`;
  domString += `<h2>Wind Speed: ${weatherData.wind.speed} MPH</h2>`;
  printToDom(domString, '#output');
}

function build5DayWeather (data) {}

function build3DayWeather (data) {}

function buildDom (weatherData) {
  buildCurrentWeather(weatherData[0]);
  build5DayWeather(weatherData[1]);
  build3DayWeather(weatherData[1]);
}

function printToDom (str, id) {
  $(id).append(str);
}

module.exports = {
  buildDom,
};
