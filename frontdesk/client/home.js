Template.home.events({
  'click a.logout': function(e, t) {
    Meteor.logout();
    Session.set('allSubsReady', false);
    globalSubManager.clear();
    sAlert.success('Vous étes déconnecté');
  }
});
