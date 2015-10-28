Template.header.helpers({
  email() {
    const user = Meteor.user();
    if (user) {
      return Meteor.user().emails[0].address;
    }
    return '';
  }
});

Template.header.events({
  'click .exit': function(e, t) {
    e.preventDefault();
    Meteor.logout();
  }
});
