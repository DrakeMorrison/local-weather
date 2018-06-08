'use strict';
const data = require('./data.js');
const firebaseApi = require('./firebaseApi.js');
const {checkLoginStatus,} = require('./auth.js');

function getAPIKey () {
  return new Promise(function (resolve, reject) {
    $.get('/db/apiKeys.json')
      .done(function (data) {
        resolve(data);
      })
      .fail(function (err) {
        reject('ERROR:', err);
      });
  });
}

function retrieveAPIKey () {
  getAPIKey().then(function (results) {
    data.setKey(results.apiKeys[0].apiKey);
    firebaseApi.setConfig(results.apiKeys[1].firebase);
    firebase.initializeApp(results.apiKeys[1].firebase);
    checkLoginStatus();
  }).catch(console.error.bind(console));
}

module.exports = {
  retrieveAPIKey,
};
