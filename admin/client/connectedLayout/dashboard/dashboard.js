Template.dashboard.onCreated(function() {
  this.subscribe('dasboardCollections');
});

Template.dashboard.onRendered(function() {
  $('.main-title').children().text('Dashboard');
});

Template.dashboard.helpers({
  table() {
    return SharedTables.Users;
  },
  usersCount() {
    const count = Meteor.users.find().count();
    return numeral(count).format('0,0');
  },
  usersLabel() { return 'Inscrits'; },
  subscribersCount() {
    const count = SD.Structure.subscribers.collection.find().count();
    return numeral(count).format('0,0');
  },
  subscribersLabel() { return 'Adhérents'; },
  programsCount() {
    const count = SD.Structure.programs.collection.find().count();
    return numeral(count).format('0,0');
  },
  programsLabel() { return 'Programmes & sessions'; }
});
