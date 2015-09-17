BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('home');
  }
});

FlowRouter.route('/menu', {
  action: function() {
    BlazeLayout.render('popupMenu');
  }
});
