Template.import.onCreated(function() {
  this.pending = new ReactiveVar(false);
});

Template.import.onRendered(function() {
  $('.main-title').children().text('Sources externes');
  this.$('.progress').progress();

});

Template.import.helpers({
  classDisabled() {
    const instance = Template.instance();
    return instance.pending.get() ? 'disabled' : '';
  }
});

const treatFile = function(e, t) {
  e.preventDefault();
  t.pending.set(true);
  FS.Utility.eachFile(e, function(file) {
    const fsFile = new FS.File(file);
    console.log('fsFile', fsFile);
    if (fsFile.type() !== 'text/csv') {
      return sAlert.error('Mauvais format');
    }
    
  });
};

Template.import.events({
  'click .button.file': function(e, t) {
    t.$('input.file').click();
  },
  'dropped #dropzone': treatFile,
  'change input.file': treatFile
});
