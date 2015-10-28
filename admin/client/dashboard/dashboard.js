Template.dashboard.onCreated(function() {
  console.log('Dashboard created');
});


Template.dashboard.helpers({
  table() {
    return SharedTables.Users;
  }
});
