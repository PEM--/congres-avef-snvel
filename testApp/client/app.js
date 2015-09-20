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

Template.MainMenu.events({
  'click .hamburger': function() {
    console.log('Hamburger clicked');
    $('aside.client').toggleClass('open');
  },
  // 'tap .hamburger': function() {
  //   console.log('Hamburger tapped');
  //   $('aside.client').toggleClass('open');
  // },
  // 'mouseover .hamburger': function() {
  //   console.log('Hamburger hovered');
  //   $el = $('aside.client');
  //   if (!$el.hasClass('open')) {
  //     $el.addClass('open');
  //   }
  // }
});
