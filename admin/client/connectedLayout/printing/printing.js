Template.printing.onCreated(function() {
  this.subscribe('dasboardCollections');
});

Template.printing.onRendered(function() {
  $('.main-title').children().text('Impression');
});

Template.printing.helpers({
  usersCount() {
    const count = Meteor.users.find().count();
    return numeral(count).format('0,0');
  }
});

Template.printing.events({
  'click a.print': function(e, t) {
    e.preventDefault();
    t.$('a.print').toggleClass('disabled');
    console.log('Printing');
    let pdf = new PdfRenderer({size: 'a4'});
    t.autorun(function() {
      if (pdf.ready()) {
        pdf.h1('Testing');
        pdf.finish('test.pdf', function() {
          t.$('a.print').toggleClass('disabled');
        });
      }
    });
  }
});
