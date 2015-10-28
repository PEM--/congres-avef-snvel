FlowRouter.route('/', {
  action() {
    BlazeLayout.render('mainLayout', {main: 'login'});
  }
});
