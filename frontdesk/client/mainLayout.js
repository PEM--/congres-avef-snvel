Template.mainLayout.onRendered(function() {
  $(".button-collapse").sideNav({
    closeOnClick: true
  });
});

Template.mainLayout.helpers({
  disabledClass() {
    return Meteor.userId() ? '' : 'disabled';
  }
});

// Template.mainLayout.events(function() {
//   'click a'
//   $(".button-collapse").sideNav('hide');
// });
