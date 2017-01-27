/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var projectButton = document.getElementById('project');
var optionsButton = document.getElementById('options');

var cardId = t.card;
var projectKey = 'card-' + cardId + '-vote-project';
var optionsKey = 'card-' + cardId + '-vote-options';

t.render(function(){
  return Promise.all([
    t.get('card', 'shared', projectKey, {}),
    t.get('card', 'shared', optionsKey, [])
  ])
  .spread(function(projectVote, optionVotes) {
    if (projectVote !== {}) {
      // We can only have one project vote at any given time.
      projectButton.disabled = true;
    }
  })
  .then(function() {
    t.sizeTo('#content')
    .done();
  });
});

projectButton.addEventListener('click', function() {
  return t.set('card', 'shared', projectKey, {
      votes: [],
      status: 'going-ahead'
  })
  .then(function() {
    t.closePopup();
  });
});

optionsButton.addEventListener('click', function() {
  return t.get('card', 'shared', optionsKey, [])
  .then(function() {
    return t.set('card', 'shared', optionsKey, optionsVote);
  })
  .then(function(optionsVote) {
    optionsVote.push({
      options: []
    });
    return t.set('card', 'shared', optionsKey, optionsVote);
  }).then(function() {
    return t.closePopup();
  });
});

