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

Template.import.events({
  'click .button.file': function(e, t) {
    t.$('input.file').click();
    t.pending(true);
  },
  'dropped #dropzone': function(e, t) {
    e.preventDefault();
    t.pending(true);
    FS.Utility.eachFile(e, function(file) {
      console.log('file', file);
    });
  }
});
