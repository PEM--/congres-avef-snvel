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
    if (fsFile.type() !== 'text/csv') {
      t.pending.set(false);
      return sAlert.error('Mauvais format');
    }
    let fr = new FileReader();
    fr.onloadstart = function(frEvent) {
      t.$('.file-upload')
        .removeClass('grey')
        .toggleClass('active green')
        .progress({percent: 0});
    };
    fr.onprogress = function(frEvent) {
      t.$('.file-upload').progress({percent: frEvent.loaded / frEvent.total});
    };
    fr.onload = function(frEvent) {
      t.$('.progress.file-upload')
        .progress({percent: 100});
      t.$('.progress.user-insertion')
        .removeClass('grey')
        .progress({percent: 0})
        .toggleClass('active blue');
      const lines = frEvent.target.result.split('\n');
      lines.forEach((line, idx) => {
        Meteor.defer(() => {
          console.log(idx, lines.length);
          t.$('.progress.user-insertion').progress({percent: (idx + 1) / lines.length });
          if (idx === lines.length - 1) {
            sAlert.success('Insertion terminée');
            t.$('.progress.file-upload')
              .removeClass('active green')
              .progress({percent: 0})
              .addClass('grey');
            // t.$('.progress.user-insertion')
            //   .removeClass('active blue')
            //   .progress({percent: 0})
            //   .addClass('grey');
            t.pending.set(false);
          }
        });
      });
    };
    fr.readAsText(fsFile.data.blob, 'utf8');
  });
};

Template.import.events({
  'click .button.file': function(e, t) {
    t.$('input.file').click();
  },
  'dropped #dropzone': treatFile,
  'change input.file': treatFile
});
