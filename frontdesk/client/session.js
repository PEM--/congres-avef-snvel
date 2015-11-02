Template.session.onRendered(function() {
  $('select').material_select();
});

Template.session.onDestroyed(function() {
  $('select').material_select('destroy');
});
