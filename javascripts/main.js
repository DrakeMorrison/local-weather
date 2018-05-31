'use strict';
const apiKeys = require('./apiKeys.js');
const events = require('./events.js');

(function startApp () {
  $('#output-div').hide();
  apiKeys.retrieveAPIKey();
  events.addSubmitEvent();
  events.addSaveEvent();
  events.addViewSavedEvent();
})();
