Template.header.onRendered(function() {
  this.$('.dropdown').dropdown();
});

Template.header.helpers({
  profileUrl() {
    return `/dashboard/content/users/${Meteor.userId()}`;
  },
  email() {
    const user = Meteor.user();
    if (user) {
      return Meteor.user().emails[0].address;
    }
    return '';
  }
});

Template.header.events({
  'click .menu-toggle': function(e, t) {
    e.preventDefault();
    $('.ui.sidebar')
      .sidebar('toggle');
    console.log('Toggle menu');
  },
  'click .exit': function(e, t) {
    e.preventDefault();
    Meteor.logout();
  }
});
