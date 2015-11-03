Template.printing.onCreated(function() {
  this.subscribe('dasboardCollections');
  this.job = new ReactiveVar(null);
  this.lastName = new ReactiveVar(null);
  this.firstName = new ReactiveVar(null);
  this.city = new ReactiveVar(null);
});

Template.printing.onRendered(function() {
  $('.main-title').children().text('Impression');
  this.$('.qr-code-container').html(Meteor.user().profile.qrImage);
});

Template.printing.helpers({
  usersCount() {
    const count = Meteor.users.find().count();
    return numeral(count).format('0,0');
  },
  lastName() {
    const instance = Template.instance();
    return instance.lastName.get();
  },
  firstName() {
    const instance = Template.instance();
    return instance.firstName.get();
  },
  city() {
    const instance = Template.instance();
    return instance.city.get();
  }
});

Template.printing.events({
  'click a.print': function(e, t) {
    e.preventDefault();
    t.$('a.print').toggleClass('disabled');
    console.log('Printing');
    let pdf = new PdfRenderer({
      size: 'a4',
      margins: {
        top: 570, bottom: 57,
        left: 23, right: 23
      }
    });
    pdf.finish('test.pdf', function() {
      t.$('a.print').toggleClass('disabled');
    });
  }
});
