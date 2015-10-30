Meteor.methods({
  removeDocument(documentId, collectionName) {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
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
      console.log(this.userId, 'has deleted document', documentId, 'from collection', definition.name);
      definition.conf.collection.remove(documentId);
    } catch (error) {
      console.warn('Error removing document', error);
      // Relaunch error done by this function
      if (error.error === 'admin') {
        throw error;
      }
      throw new Meteor.Error('admin', error.toString());
    }
  },
  dictionaryUpdate: function(update, documentId) {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error('admin', 'Unauthorized');
    }
    try {
      check(update, SD.Structure.dictionary.schema);
      check(documentId, String);
      SD.Structure.dictionary.collection.update(documentId, update);
      console.log('Dictionary updated');
    } catch (error) {
      console.warn('Error updating dictionary', error);
      // Relaunch error done by this function
      if (error.error === 'admin') {
        throw error;
      }
      throw new Meteor.Error('admin', error.toString());
    }
  }
});
