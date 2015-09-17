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

// Template.popupMenu.onRendered(function() {
//   $('.hamburger.right.aligned.column h1').popup({
//     inline: true,
//     lastResort: true,
//     hoverable: true,
//     position: 'bottom left',
//     // delay: {
//     //   show: 300,
//     //   hide: 800
//     // }
//   });
// });
