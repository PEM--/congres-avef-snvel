Meteor.publish('uniqueItem', function(documentId, collectionName) {
  if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
    throw new Meteor.Error('admin', 'Unauthorized');
  }
  try {
    check(documentId, String);
    check(collectionName, String);
    const definition = _.find(SharedTablesDefinition, route => {
      return route.name.toLowerCase() === collectionName;
    });
    if (!definition) {
      throw new Meteor.Error('admin', 'Unknown collection');
    }
    const publication = definition.conf.collection.find({_id: documentId});
    if (publication.count() === 0) {
      throw new Meteor.Error('admin', 'Unknown document');
    }
    return definition.conf.collection.find({_id: documentId});
  } catch (error) {
    console.warn('Error publising document', error);
    // Relaunch error done by this function
    if (error.error === 'admin') {
      throw error;
    }
    throw new Meteor.Error('admin', error.toString());
  }
});

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
