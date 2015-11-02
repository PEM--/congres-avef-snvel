Meteor.publish('UserAndPrograms', function() {
  if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
    throw new Meteor.Error('frontdesk', 'Unauthorized');
  }
  return [
    Meteor.users.find(),
    SD.Structure.programs.collection.find(),
    SD.Structure.pricings.collection.find()
  ];
});
