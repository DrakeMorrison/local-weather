'use strict';
const {setUID,} = require('./firebaseApi');

function checkLoginStatus () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUID(user.uid);
      $('#logout-btn, #search-bar-div').show();
      $('#authScreen').hide();
    } else {
      $('#authScreen').show();
      $('#output-div, #logout-btn, #search-bar-div').hide();
    }
  });
}

module.exports = {
  checkLoginStatus,
};
