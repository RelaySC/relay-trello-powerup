/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var onHoldSelector = document.getElementById('on-hold');
var scrappedSelector = document.getElementById('scrapped');

var percentageRegex = /\d+\%/;

function percentageStringToNumber(value) {
  var removedSymbol = value.replace('%', '');
  return parseInt(removedSymbol);
}

t.render(function(){
  return Promise.all([
    t.get('board', 'shared', 'threshold-on-hold'),
    t.get('board', 'shared', 'threshold-scrapped')
  ])
  .spread(function(onHoldThreshold, scrappedThreshold) {
    if(onHoldThreshold && percentageRegex.test(onHoldThreshold)) {
      onHoldSelector.value = percentageStringToNumber(onHoldThreshold);
    }

    if(scrappedThreshold && percentageRegex.test(scrappedThreshold)) {
      scrappedSelector.value = percentageStringToNumber(scrappedThreshold);
    }
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});

document.getElementById('save').addEventListener('click', function() {
  return t.set('board', 'shared', 'threshold-on-hold', onHoldSelector.value)
  .then(function(){
    return t.set('board', 'shared', 'threshold-scraped', scrappedSelector.value);
  })
  .then(function(){
    t.closePopup();
  })
})
