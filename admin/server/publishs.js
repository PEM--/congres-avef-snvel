Meteor.publish('dasboardCollections', function() {
  if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
    throw new Meteor.Error('admin', 'Unauthorized');
  }
  return [
    Meteor.users.find(),
    SD.Structure.subscribers.collection.find(),
    SD.Structure.programs.collection.find()
  ];
});
