Template.dashboard.onCreated(function() {
  this.subscribe('SubscribersAll');
  this.subscribe('ProgramsAll');
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
    return numeral(count).format('0a');
  },
  usersLabel() { return 'Nombre d\'inscrits'; },
  subscribersCount() {
    const count = SD.Structure.subscribers.collection.find().count();
    return numeral(count).format('0a');
  },
  subscribersLabel() { return 'Nombre d\'adhérents'; },
  programsCount() {
    const count = SD.Structure.programs.collection.find().count();
    return numeral(count).format('0a');
  },
  programsLabel() { return 'Nombre de programmes'; }
});
