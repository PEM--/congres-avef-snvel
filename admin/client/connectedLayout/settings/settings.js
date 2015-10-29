Template.settings.onCreated(function() {
  this.subscribe('DictionaryAll'/*, {
    onReady: () => { this.data = SD.Structure.dictionary.collection.findOne(); }
  }*/);
  console.log('currentTemplate', this);
});

Template.settings.helpers({
  data() {
    console.log('Data', SD.Structure.dictionary.collection.findOne());
    return SD.Structure.dictionary.collection.findOne();
  }
});

Template.settings.onRendered(function() {
  $('.main-title').children().text('Réglages');
});
