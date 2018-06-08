'use strict';
const weatherAPI = require('./weatherapi.js');
const dom = require('./dom.js');
const firebaseApi = require('./firebaseApi.js');

function addSubmitEvent () {
  $('#submit-btn').on('click', startProcess);
  $(document).on('keydown', function (e) {
    if (e.keyCode === 13 && $('#logout-btn').is(':visible')) {
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
      'isScary': false,
    };
    firebaseApi.saveForecast(forecastObj);
  });
}

function addViewSavedEvent () {
  $('#saved-forecasts-btn').on('click', function () {
    showSavedForecasts();
    deleteForecastEvent();
    scaryForecastEvent();
    $('#output').hide();
    $('#3dayoutput').hide();
    $('#5dayoutput').hide();
    $('#saved-forecasts-div').show();
    $('#current-weather-btn').show();
  });
}

function deleteForecastEvent () {
  $(document).on('click', '.delete-btn', function (e) {
    const fbForecastId = $(e.target).siblings('.panel').data('firebaseId');
    firebaseApi.deleteForecast(fbForecastId)
      .then(showSavedForecasts)
      .catch(console.error.bind(console));
  });
}

function scaryForecastEvent () {
  $(document).on('click', '.scary-btn', function (e) {
    const forecastCard = $(e.target).siblings('.panel');
    const fbForecastId = $(forecastCard).data('firebaseId');
    const forecastToUpdate = {
      'nameDate': forecastCard.find('.nameDate').data('namedate'),
      'mainTemp': forecastCard.find('.main-temp').data('main-temp'),
      'maxTemp': forecastCard.find('.max-temp').data('max-temp'),
      'minTemp': forecastCard.find('.min-temp').data('min-temp'),
      'humidity': forecastCard.find('.humidity').data('humidity'),
      'description': forecastCard.find('.description').data('description'),
      'airPressure': forecastCard.find('.air-pressure').data('air-pressure'),
      'windSpeed': forecastCard.find('.wind-speed').data('wind-speed'),
      'isScary': true,
      'uid': forecastCard.data('uid'),
    };
    firebaseApi.updateForecast(forecastToUpdate, fbForecastId)
      .then(function () {
        showSavedForecasts();
      })
      .catch(console.error.bind(console));
  });
}

function showSavedForecasts () {
  firebaseApi.getSavedForecasts().then(function (results) {
    dom.buildSavedForecasts(results);
  });
}

function authEvents () {
  $('#search-bar-div, #output-div, #register-form, #logout-btn').hide();
  $('#authScreen').show();

  $('#sign-in-btn').click(function (e) {
    e.preventDefault();
    const email = $('#login-email').val();
    const pass = $('#login-password').val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .catch((error) => {
        $('#sign-in-error-msg').text(error.message);
        $('#sign-in-error').removeClass('hide');
      });
  });

  $('#register-btn').click(function (e) {
    e.preventDefault();
    const email = $('#register-email').val();
    const pass = $('#register-password').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .catch((error) => {
        $('#register-error-msg').text(error.message);
        $('#register-error').removeClass('hide');
      });
  });

  $('#logout-btn').click(function () {
    firebase.auth().signOut().catch(console.error.bind(console));
  });

  $('#show-sign-in').click(function () {
    $('#login-form').show();
    $('#register-form').hide();
  });

  $('#show-register').click(function () {
    $('#login-form').hide();
    $('#register-form').show();
  });
}

module.exports = {
  addSubmitEvent,
  addSaveEvent,
  addViewSavedEvent,
  authEvents,
};
