AutoForm.hooks({
  dictionaryUpdate: {
    onSuccess() {
      sAlert.success('Réglages mis à jour');
      FlowRouter.go('/dashboard');
    },
    onError(type, error) {
      sAlert.error('Impossible de mettre à jour les réglages :', error.toString());
    }
  }
});


Template.settings.onCreated(function() {
  this.subscribe('DictionaryAll');
});

Template.settings.onRendered(function() {
  $('.main-title').children().text('Réglages');
});

Template.settings.helpers({
  data() {
    return SD.Structure.dictionary.collection.findOne();
  }
});
