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

Template.popupMenu.events({
  'click .hamburger': function() {
    console.log('Hmaburger clicked');
    $('aside.client').toggleClass('open');
  }
});
