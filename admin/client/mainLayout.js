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
