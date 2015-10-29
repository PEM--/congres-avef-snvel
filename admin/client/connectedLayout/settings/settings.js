Template.settings.onCreated(function() {
  this.subscribe('DictionaryAll');
});

Template.settings.onRendered(function() {
  $('.main-title').children().text('Réglages');
});
