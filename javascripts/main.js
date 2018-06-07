'use strict';
const apiKeys = require('./apiKeys.js');
const events = require('./events.js');
const {authenticate,} = require('./auth.js');

(function startApp () {
  $('#output-div').hide();
  apiKeys.retrieveAPIKey();
  events.addSubmitEvent();
  events.addSaveEvent();
  events.addViewSavedEvent();
  authenticate();
})();
