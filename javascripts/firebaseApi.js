'use strict';

let firebaseConfig = {};
let uid = '';

function setConfig (input) {
  firebaseConfig = input;
}

function setUID (input) {
  uid = input;
}

function saveForecast (input) {
  input.uid = uid;
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
    $.ajax(`${firebaseConfig.databaseURL}/forecasts.json?orderBy="uid"&equalTo="${uid}"`)
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
      url: `${firebaseConfig.databaseURL}/forecasts/${forecastId}.json`,
    })
      .done(function () {
        resolve();
      })
      .fail(function (error) {
        reject(error);
      });
  });
}

function updateForecast (modifiedForecast, forecastId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/forecasts/${forecastId}.json`,
      data: JSON.stringify(modifiedForecast),
    })
      .done(function (newForecast) {
        resolve(newForecast);
      })
      .fail(function (error) {
        reject(error);
      });
  });
}

module.exports = {
  setConfig,
  saveForecast,
  getSavedForecasts,
  deleteForecast,
  updateForecast,
  setUID,
};
