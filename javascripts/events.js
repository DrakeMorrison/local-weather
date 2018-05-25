const weatherAPI = require('./weatherapi.js');
const dom = require('./dom.js');

function addSubmitEvent () {
  $('#submit-btn').on('click', startProcess);
  $(document).on('keydown', function (e) {
    if (e.keyCode === 13) {
      startProcess();
    }
  });
}

function startProcess () {
  const input = $('#search-bar-input').val();
  const goodInput = checkInput(input);
  const weatherData = weatherAPI.retrieveData(goodInput);
  weatherData.then(function (results) {
    dom.buildDom(results);
    $('#output-div').show();
  });
}

function checkInput (input) {
  if ($.isNumeric(input) && input !== '' && input.length === 5) {
    return input;
  } else {
    alert('Please type in a 5-digit zip code, thanks!');
  }
}

module.exports = {
  addSubmitEvent,
};
