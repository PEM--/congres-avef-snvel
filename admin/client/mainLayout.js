FlowRouter.route('/', {
  name: 'login',
  triggersEnter: [
    function(context, redirect) {
      if (Meteor.userId() &&
        Roles.userIsInRole(Meteor.userId(), 'admin')
      ) {
        FlowRouter.redirect('dashboard');
      }
    }
  ],
  action() {
    BlazeLayout.render('mainLayout', {main: 'login'});
  }
});

// Automatically go to dashboard or login screen
Tracker.autorun(function(computation) {
  const userId = Meteor.userId();
  if (!computation.firstRun) {
    if (userId) {
      if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
        FlowRouter.go('dashboard');
      } else {
        sAlert.error('Deconnexion: droits administratifs manquants');
        Meteor.logout();
        FlowRouter.go('/');
      }
    } else {
      FlowRouter.go('/');
    }
  }
});
