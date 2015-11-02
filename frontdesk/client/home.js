Template.home.events({
  'click a.logout': function(e, t) {
    Meteor.logout();
    Session.set('allSubsReady', false);
    globalSubManager.reset();
    globalSubManager.clear();
    sAlert.success('Vous étes déconnecté');
  }
});
