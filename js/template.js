/* global TrelloPowerUp */

var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';

TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      icon: WHITE_ICON,
      text: 'Relay',
      url: 'https://relay.sc'
    },
    {
      icon: WHITE_ICON,
      text: 'Relay Administration',
      url: 'https://relay.sc/administration'
    }];
  },
  'card-buttons': function(t, options){
    return [{
      icon: GRAY_ICON,
      text: 'Voting',
      callback: function(t){
        return t.popup({
          title: "Add New Vote",
          url: './templates/choose-vote-type.html'
        });
      }
    }];
  },
  'show-settings': function(t, options){
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184
    });
  }
});
