Template.import.onCreated(function() {
  this.pending = new ReactiveVar(false);
  this.totalToInsert = 0;
  this.usersToInsert = [];
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

const treatUsers = (function(t) {
  // Parse each line
  const line = t.usersToInsert.shift();
  console.log(t.totalToInsert, t.usersToInsert.length);
  t.$('.progress.user-insertion')
    .progress({percent: (t.totalToInsert - t.usersToInsert.length) / t.totalToInsert});
  Meteor.call('automaticInscription', line, (error) => {
    if (error) {
      sAlert.error(error.toString());
      t.$('.ui.error.message ul.content')
        .append(`<li>${error.toString()} sur la ligne: ${line}</li>`);
    }
    // Handle end of list or re-execution of insertion
    if (t.usersToInsert.length === 0) {
      t.totalToInsert = 0;
      sAlert.success('Insertion terminée');
      t.$('.progress.file-upload')
        .removeClass('active violet success')
        .progress({percent: 0})
        .addClass('grey');
      t.$('.progress.user-insertion')
        .removeClass('active blue success')
        .progress({percent: 0})
        .addClass('grey');
      t.$('input.file').val('');
      t.pending.set(false);
    } else {
      Meteor.defer(() => treatUsers(t));
    }
  });
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
        .addClass('active violet')
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
        .addClass('active blue');
      Meteor.defer(() => {
        let lines = frEvent.target.result.split('\n');
        // Remove header
        lines.shift();
        // Remove last line if empty
        if (_.last(lines) === '') {
          lines.pop();
        }
        // Launch user insertion
        t.usersToInsert = lines;
        t.totalToInsert = lines.length;
        treatUsers(t);
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
  'change input.file': function(e, t) {
    if (t.$('input.file').val() !== '') {
      treatFile(e, t);
    }
  }
});
