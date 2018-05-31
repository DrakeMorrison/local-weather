'use strict';
let currentWeather = {};
let fiveDayWeather = {};
let apiKey = '';

function setCurrentWeather (data) {
  currentWeather = data;
}

function set5DayWeather (data) {
  fiveDayWeather = data;
}

function setKey (data) {
  apiKey = data;
}

const getKey = () => apiKey;

const getCurrentWeather = () => currentWeather;

const get5DayWeather = () => fiveDayWeather;

module.exports = {
  set5DayWeather,
  setCurrentWeather,
  setKey,
  get5DayWeather,
  getCurrentWeather,
  getKey,
};
