const weatherAPI = require('./weatherapi.js');
const dom = require('./dom.js');

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
    $('#current-btn').show();
    $('#output').hide();
    $('#5dayoutput').hide();
  });
  $('#5daybtn').on('click', function () {
    $('#5dayoutput').show();
    $('#current-btn').show();
    $('#output').hide();
    $('#3dayoutput').hide();
  });
}

function addCurrentWeatherButton () {
  $('#current-weather-btn').on('click', function () {
    $('#output').show();
    $('#3dayoutput').hide();
    $('#5dayoutput').hide();
  });
}

module.exports = {
  addSubmitEvent,
};
