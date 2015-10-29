// Users collection
Meteor.users.helpers({
  address: function() { return this.emails[0].address; },
  fullName: function() {
    if (this.profile) {
      return this.profile.lastName + ' ' + this.profile.firstName;
    }
    return '';
  }
});
