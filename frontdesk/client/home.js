Template.home.events({
  'click a.logout': function(e, t) {
    Meteor.logout();
    sAlert.success('Vous étes déconnecté');
  }
});
