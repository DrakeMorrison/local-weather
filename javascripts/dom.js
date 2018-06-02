'use strict';
function buildCurrentWeather (weatherData) {
  let domString = '';
  domString += `<div class='col-md-12'>`;
  domString += `<h1>Current Weather</h1>`;
  domString += `<div class="panel panel-default">`;
  domString += `<div class="panel-heading nameDate" data-nameDate='${weatherData.name}'>${weatherData.name}</div>`;
  domString += `<ul class="list-group">`;
  domString += `<li class="list-group-item main-temp" data-main-temp='${weatherData.main.temp}'>Temperature: <strong class='main-temp'>${weatherData.main.temp}</strong>&#176;F</li>`;
  domString += `<li class="list-group-item max-temp" data-max-temp='${weatherData.main.temp_max}'>High: ${weatherData.main.temp_max}&#176;F</li>`;
  domString += `<li class="list-group-item min-temp" data-min-temp='${weatherData.main.temp_min}'>Low: ${weatherData.main.temp_min}&#176;F</li>`;
  domString += `<li class="list-group-item humidity" data-humidity='${weatherData.main.humidity}'>Humidity: ${weatherData.main.humidity}%</li>`;
  domString += `<li class="list-group-item text-capitalize description" data-description='${weatherData.weather[0].description}'>${weatherData.weather[0].description}</li>`;
  domString += `<li class="list-group-item air-pressure" data-air-pressure='${weatherData.main.pressure}'>Air Pressure: ${weatherData.main.pressure} hpa</li>`;
  domString += `<li class="list-group-item wind-speed" data-wind-speed='${weatherData.wind.speed}'>Wind Speed: ${weatherData.wind.speed} MPH</li>`;
  domString += `</ul>`;
  domString += `</div>`;
  domString += `<button type="button" class="btn btn-warning save-btn">Save Forecast</button>`;
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
    domString += `<div class="panel-heading nameDate" data-nameDate='${data.list[i].dt_txt}'>${data.list[i].dt_txt}</div>`;
    domString += `<ul class="list-group">`;
    domString += `<li class="list-group-item">Temperature: <strong class='main-temp' data-main-temp='${data.list[i].main.temp}'>${data.list[i].main.temp}</strong>&#176;F</li>`;
    domString += `<li class="list-group-item max-temp" data-max-temp='${data.list[i].main.temp_max}'>High: ${data.list[i].main.temp_max}&#176;F</li>`;
    domString += `<li class="list-group-item min-temp" data-min-temp='${data.list[i].main.temp_min}'>Low: ${data.list[i].main.temp_min}&#176;F</li>`;
    domString += `<li class="list-group-item humidity" data-humidity='${data.list[i].main.humidity}'>Humidity: ${data.list[i].main.humidity}%</li>`;
    domString += `<li class="list-group-item text-capitalize description" data-description='${data.list[i].weather[0].description}'>${data.list[i].weather[0].description}</li>`;
    domString += `<li class="list-group-item air-pressure" data-air-pressure='${data.list[i].main.pressure}'>Air Pressure: ${data.list[i].main.pressure} hpa</li>`;
    domString += `<li class="list-group-item wind-speed" data-wind-speed='${data.list[i].wind.speed}'>Wind Speed: ${data.list[i].wind.speed} MPH</li>`;
    domString += `</ul>`;
    domString += `</div>`;
    domString += `<button type="button" class="btn btn-warning save-btn">Save Forecast</button>`;
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
    domString += `<div class="panel-heading nameDate" data-nameDate='${data.list[i].dt_txt}'>${data.list[i].dt_txt}</div>`;
    domString += `<ul class="list-group">`;
    domString += `<li class="list-group-item">Temperature: <strong class='main-temp' data-main-temp='${data.list[i].main.temp}'>${data.list[i].main.temp}</strong>&#176;F</li>`;
    domString += `<li class="list-group-item max-temp" data-max-temp='${data.list[i].main.temp_max}'>High: ${data.list[i].main.temp_max}&#176;F</li>`;
    domString += `<li class="list-group-item min-temp" data-min-temp='${data.list[i].main.temp_min}'>Low: ${data.list[i].main.temp_min}&#176;F</li>`;
    domString += `<li class="list-group-item humidity" data-humidity='${data.list[i].main.humidity}'>Humidity: ${data.list[i].main.humidity}%</li>`;
    domString += `<li class="list-group-item text-capitalize description" data-description='${data.list[i].weather[0].description}'>${data.list[i].weather[0].description}</li>`;
    domString += `<li class="list-group-item air-pressure" data-air-pressure='${data.list[i].main.pressure}'>Air Pressure: ${data.list[i].main.pressure} hpa</li>`;
    domString += `<li class="list-group-item wind-speed" data-wind-speed='${data.list[i].wind.speed}'>Wind Speed: ${data.list[i].wind.speed} MPH</li>`;
    domString += `</ul>`;
    domString += `</div>`;
    domString += `<button type="button" class="btn btn-warning save-btn">Save Forecast</button>`;
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

function buildSavedForecasts (inputArray) {
  let domString = '';
  inputArray.forEach(function (input, i) {
    if (i % 3 === 0) {
      domString += `<div class='row'>`;
    }
    domString += `<div class='col-md-4'>`;
    domString += `<div class="panel panel-${input.isScary ? 'danger' : 'default'}" data-firebase-id=${input.id}>`;
    domString += `<div class="panel-heading nameDate" data-nameDate='${input.nameDate}'>${input.nameDate}</div>`;
    domString += `<ul class="list-group">`;
    domString += `<li class="list-group-item">Temperature: <strong class='main-temp' data-main-temp='${input.mainTemp}'>${input.mainTemp}</strong>&#176;F</li>`;
    domString += `<li class="list-group-item max-temp" data-max-temp='${input.maxTemp}'>High: ${input.maxTemp}&#176;F</li>`;
    domString += `<li class="list-group-item min-temp" data-min-temp='${input.minTemp}'>Low: ${input.minTemp}&#176;F</li>`;
    domString += `<li class="list-group-item humidity" data-humidity='${input.humidity}'>Humidity: ${input.humidity}%</li>`;
    domString += `<li class="list-group-item text-capitalize description" data-description='${input.description}'>${input.description}</li>`;
    domString += `<li class="list-group-item air-pressure" data-air-pressure='${input.airPressure}'>Air Pressure: ${input.airPressure} hpa</li>`;
    domString += `<li class="list-group-item wind-speed" data-wind-speed='${input.windSpeed}'>Wind Speed: ${input.windSpeed} MPH</li>`;
    domString += `</ul>`;
    domString += `</div>`;
    domString += `<button class="btn btn-danger delete-btn" type="submit">Delete</button>`;
    domString += `<button class="btn btn-danger scary-btn" type="submit">Scary!</button>`;
    domString += `</div>`;
    if (i % 3 === 2) {
      domString += `</div>`;
    }
  });
  printToDom(domString, '#saved-forecasts-div');
}

module.exports = {
  buildDom,
  buildSavedForecasts,
};
