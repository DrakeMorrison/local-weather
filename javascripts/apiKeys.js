const data = require('./data.js');

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
  }).catch(console.error.bind(console));
}

module.exports = {
  retrieveAPIKey,
};
