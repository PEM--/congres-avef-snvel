const RemoteDataUrl = 'http://localhost:3000';

Meteor.remoteConnection = DDP.connect(RemoteDataUrl);
Meteor.remoteConnection.onReconnect = function() {
  console.log('Meteor.remoteConnection.onReconnect', arguments);
};
Accounts.connection = Meteor.remoteConnection;
Meteor.users = new Meteor.Collection('users', {connection: Meteor.remoteConnection});


// MyOwnRemoteCollection = new Meteor.Collection('collection', {connection: Meteor.remoteConnection});


Tracker.autorun(function() {
  const token = Session.get('_storedLoginToken');
  if (token) {
    Meteor.loginWithToken(token, function(err) {
      if (!err) {
        console.log('loginWithToken ', token);
      }
    });
  }
});

Tracker.autorun(function() {
  const user = Meteor.user();
  console.log('autorun.user');
  if (user) {
    Session.set('_storedLoginToken', Accounts._storedLoginToken());
  }
});
