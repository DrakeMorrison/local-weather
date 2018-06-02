'use strict';
const weatherAPI = require('./weatherapi.js');
const dom = require('./dom.js');
const firebaseApi = require('./firebaseApi.js');

function addSubmitEvent () {
  $('#submit-btn').on('click', startProcess);
  $(document).on('keydown', function (e) {
    if (e.keyCode === 13) {
      startProcess();
    }
  });
}

function startProcess () {
  const input = $('#search-bar-input').val();
  const goodInput = checkInput(input);
  const weatherData = weatherAPI.retrieveData(goodInput);
  weatherData.then(function (results) {
    dom.buildDom(results);
    $('#output-div').show();
    $('#3dayoutput').hide();
    $('#5dayoutput').hide();
    $('#saved-forecasts-div').hide();
    $('#current-weather-btn').hide();
    addForecastButtons();
    addCurrentWeatherButton();
  });
}

function checkInput (input) {
  if ($.isNumeric(input) && input !== '' && input.length === 5) {
    return input;
  } else {
    alert('Please type in a 5-digit zip code, thanks!');
  }
}

function addForecastButtons () {
  $('#3daybtn').on('click', function () {
    $('#3dayoutput').show();
    $('#current-weather-btn').show();
    $('#output').hide();
    $('#5dayoutput').hide();
    $('#saved-forecasts-div').hide();
  });
  $('#5daybtn').on('click', function () {
    $('#5dayoutput').show();
    $('#current-weather-btn').show();
    $('#output').hide();
    $('#3dayoutput').hide();
    $('#saved-forecasts-div').hide();
  });
}

function addCurrentWeatherButton () {
  $('#current-weather-btn').on('click', function () {
    $('#output').show();
    $('#output').siblings('.row').hide();
    $('#current-weather-btn').hide();
  });
}

function addSaveEvent () {
  $(document).on('click', '.save-btn', function (e) {
    const forecastCard = $(e.target).siblings('.panel');
    const forecastObj = {
      'nameDate': forecastCard.find('.nameDate').data('namedate'),
      'mainTemp': forecastCard.find('.main-temp').data('main-temp'),
      'maxTemp': forecastCard.find('.max-temp').data('max-temp'),
      'minTemp': forecastCard.find('.min-temp').data('min-temp'),
      'humidity': forecastCard.find('.humidity').data('humidity'),
      'description': forecastCard.find('.description').data('description'),
      'airPressure': forecastCard.find('.air-pressure').data('air-pressure'),
      'windSpeed': forecastCard.find('.wind-speed').data('wind-speed'),
      'isScary': forecastCard.data('isscary'),
    };
    firebaseApi.saveForecast(forecastObj);
  });
}

function addViewSavedEvent () {
  $('#saved-forecasts-btn').on('click', function () {
    firebaseApi.getSavedForecasts().then(function (results) {
      dom.buildSavedForecasts(results);
      $('#output').hide();
      $('#3dayoutput').hide();
      $('#5dayoutput').hide();
      $('#saved-forecasts-div').show();
      $('#current-weather-btn').show();
    });
  });
}

module.exports = {
  addSubmitEvent,
  addSaveEvent,
  addViewSavedEvent,
};
