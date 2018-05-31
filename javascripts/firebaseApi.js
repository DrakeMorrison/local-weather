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

module.exports = {
  setConfig,
  saveForecast,
};
