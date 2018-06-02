'use strict';

let firebaseConfig = {};

function setConfig (input) {
  firebaseConfig = input;
}

function saveForecast (input) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/forecasts.json`,
      data: JSON.stringify(input),
    })
      .done(function (uniqueKey) {
        resolve(uniqueKey);
      })
      .fail(function (error) {
        reject(error);
      });
  });
}

function getSavedForecasts () {
  const forecastsAndKeys = [];
  return new Promise(function (resolve, reject) {
    $.ajax(`${firebaseConfig.databaseURL}/forecasts.json`)
      .then(function (allForecasts) {
        if (allForecasts !== null) {
          Object.keys(allForecasts).forEach(function (key) {
            allForecasts[key].id = key;
            forecastsAndKeys.push(allForecasts[key]);
          });
        }
        resolve(forecastsAndKeys);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

function deleteForecast (forecastId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: 'DELETE',
      url: '',
    })
      .done()
      .fail();
  });
}

module.exports = {
  setConfig,
  saveForecast,
  getSavedForecasts,
  deleteForecast,
};
