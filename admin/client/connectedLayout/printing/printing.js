Template.printing.onCreated(function() {
  this.subscribe('dasboardCollections');
  this.lastName = new ReactiveVar(null);
  this.firstName = new ReactiveVar(null);
  this.city = new ReactiveVar(null);
});

Template.printing.onRendered(function() {
  $('.main-title').children().text('Impression');
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

let printableUsers = [];
const printUsers = function(self, pdf, cb) {
  const user = printableUsers.pop();
  console.log(user);
  if (user.profile) {
    self.lastName.set(user.profile.lastName);
    self.firstName.set(user.profile.firstName);
    self.city.set(user.profile.city);
    self.$('.qr-code-container').html(user.profile.qrImage);
  }
  if (printableUsers.length > 0) {
    Meteor.setTimeout(() => printUsers(self, pdf, cb), 64);
  } else {
    cb();
  }
};

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
    printableUsers = Meteor.users.find().fetch();
    printUsers(t, pdf, function() {
      pdf.finish('test.pdf', function() {
        t.$('a.print').toggleClass('disabled');
      });
    });
  }
});
