// Users collection
Meteor.users.helpers({
  address: function() {
    console.log('Collection helper', this);
    if (this.emails) {
      return this.emails[0].address;
    }
    return '';
  }
});
