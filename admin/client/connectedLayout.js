FlowRouter.route('/dashboard', {
  name: 'dashboard',
  triggersEnter: [
    function(context, redirect) {
      if (!Meteor.userId() ||
        !Roles.userIsInRole(Meteor.userId(), 'admin')
      ) {
        console.warn('User', Meteor.userId(), 'Roles', Roles.userIsInRole(Meteor.userId(), 'admin'));
        sAlert.error('Connexion requise');
        FlowRouter.redirect('/');
      }
    }
  ],
  action() {
    BlazeLayout.render('connectedLayout', {
      header: 'header',
      menu: 'menu',
      main: 'dashboard'
    });
  }
});
