function buildCurrentWeather (weatherData) {
  let domString = '';
  domString += `<div class='col-md-12'>`;
  domString += `<h1>Current Weather</h1>`;
  domString += `<div class="panel panel-default">`;
  domString += `<div class="panel-heading">${weatherData.name}</div>`;
  domString += `<ul class="list-group">`;
  domString += `<li class="list-group-item">Temperature: <strong class=''>${weatherData.main.temp}</strong>&#176;F</li>`;
  domString += `<li class="list-group-item">High: ${weatherData.main.temp_max}&#176;F</li>`;
  domString += `<li class="list-group-item">Low: ${weatherData.main.temp_min}&#176;F</li>`;
  domString += `<li class="list-group-item">Humidity: ${weatherData.main.humidity}%</li>`;
  domString += `<li class="list-group-item text-capitalize">${weatherData.weather[0].description}</li>`;
  domString += `<li class="list-group-item">Air Pressure: ${weatherData.main.pressure} hpa</li>`;
  domString += `<li class="list-group-item">Wind Speed: ${weatherData.wind.speed} MPH</li>`;
  domString += `</ul>`;
  domString += `</div>`;
  domString += `</div>`;

  printToDom(domString, '#output');
}

function build5DayWeather (data) {
  let domString = '';
  domString += `<h1>5 Day Forecast</h1>`;
  for (let i = 4; i < data.list.length; i += 8) {
    if (i === 4) {
      domString += `<div class='col-md-2 col-md-offset-1'>`;
    } else {
      domString += `<div class='col-md-2'>`;
    }
    domString += `<div class="panel panel-default">`;
    domString += `<div class="panel-heading">${data.list[i].dt_txt}</div>`;
    domString += `<ul class="list-group">`;
    domString += `<li class="list-group-item">Temperature: <strong class=''>${data.list[i].main.temp}</strong>&#176;F</li>`;
    domString += `<li class="list-group-item">High: ${data.list[i].main.temp_max}&#176;F</li>`;
    domString += `<li class="list-group-item">Low: ${data.list[i].main.temp_min}&#176;F</li>`;
    domString += `<li class="list-group-item">Humidity: ${data.list[i].main.humidity}%</li>`;
    domString += `<li class="list-group-item text-capitalize">${data.list[i].weather[0].description}</li>`;
    domString += `<li class="list-group-item">Air Pressure: ${data.list[i].main.pressure} hpa</li>`;
    domString += `<li class="list-group-item">Wind Speed: ${data.list[i].wind.speed} MPH</li>`;
    domString += `</ul>`;
    domString += `</div>`;
    domString += `</div>`;
  }

  printToDom(domString, '#5dayoutput');
}

function build3DayWeather (data) {
  let domString = '';
  domString += `<h1>3 Day Forecast</h1>`;
  for (let i = 4; i < 28; i += 8) {
    domString += `<div class='col-md-4'>`;
    domString += `<div class="panel panel-default">`;
    domString += `<div class="panel-heading">${data.list[i].dt_txt}</div>`;
    domString += `<ul class="list-group">`;
    domString += `<li class="list-group-item">Temperature: <strong class=''>${data.list[i].main.temp}</strong>&#176;F</li>`;
    domString += `<li class="list-group-item">High: ${data.list[i].main.temp_max}&#176;F</li>`;
    domString += `<li class="list-group-item">Low: ${data.list[i].main.temp_min}&#176;F</li>`;
    domString += `<li class="list-group-item">Humidity: ${data.list[i].main.humidity}%</li>`;
    domString += `<li class="list-group-item text-capitalize">${data.list[i].weather[0].description}</li>`;
    domString += `<li class="list-group-item">Air Pressure: ${data.list[i].main.pressure} hpa</li>`;
    domString += `<li class="list-group-item">Wind Speed: ${data.list[i].wind.speed} MPH</li>`;
    domString += `</ul>`;
    domString += `</div>`;
    domString += `</div>`;
  }

  printToDom(domString, '#3dayoutput');
}

function buildDom (weatherData) {
  buildCurrentWeather(weatherData[0]);
  build5DayWeather(weatherData[1]);
  build3DayWeather(weatherData[1]);
}

function printToDom (str, id) {
  $(id).html(str);
}

module.exports = {
  buildDom,
};
