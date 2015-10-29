Template.dashboard.onRendered(function() {
  $('.main-title').children().text('Dashboard');
});

Template.dashboard.helpers({
  table() {
    return SharedTables.Users;
  }
});
