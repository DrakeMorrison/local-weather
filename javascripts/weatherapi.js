'use strict';
const data = require('./data.js');

function getCurrentWeather (argObject) {
  return new Promise(function (resolve, reject) {
    $.get(`https://api.openweathermap.org/data/2.5/weather?zip=${argObject.zipcode}&appid=${argObject.apiKey}&units=imperial`)
      .done(function (data) {
        resolve(data);
      })
      .fail(function (err) {
        reject(alert(err.responseJSON.message));
      });
  });
}

function get5DayWeather (argObj) {
  return new Promise(function (resolve, reject) {
    $.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${argObj.zipcode}&appid=${argObj.apiKey}&units=imperial`)
      .done(function (data) {
        resolve(data);
      })
      .fail(function (err) {
        reject(alert(err.responseJSON.message));
      });
  });
}

function retrieveData (zipcode) {
  const apiKey = data.getKey();
  return Promise.all([getCurrentWeather({zipcode, apiKey,}), get5DayWeather({zipcode, apiKey,}),])
    .then(function (results) {
      return Promise.resolve(results);
    }).catch(console.error.bind(console));
}

module.exports = {
  retrieveData,
  getCurrentWeather,
  get5DayWeather,
};
