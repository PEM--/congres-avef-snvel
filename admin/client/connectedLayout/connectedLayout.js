let dashboardRoutes = FlowRouter.group({
  prefix: '/dashboard',
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
  ]
});

dashboardRoutes.route('/', {
  action() {
    BlazeLayout.render('connectedLayout', {header: 'header', menu: 'menu', main: 'dashboard'});
  }
});

Template.connectedLayout.onRendered(function() {
  this.$('.ui.accordion').accordion();
});
