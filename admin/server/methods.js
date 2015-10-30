Meteor.methods({
  insertDocument(newDocument, collectionName) {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error('admin', 'Unauthorized');
    }
    try {
      check(collectionName, String);
      const definition = _.find(SharedTablesDefinition, route => {
        return route.name.toLowerCase() === collectionName;
      });
      if (!definition) {
        throw new Meteor.Error('admin', 'Unknown collection');
      }
      check(newDocument, definition.conf.schema);
      const documentId = definition.conf.collection.insert(newDocument);
      console.log(this.userId, 'has inserted a new document', documentId, 'in collection', definition.name);
    } catch (error) {
      console.warn('Error inserting document', error);
      // Relaunch error done by this function
      if (error.error === 'admin') {
        throw error;
      }
      throw new Meteor.Error('admin', error.toString());
    }
  },

  updateDocument(update, documentId, collectionName) {
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
      check(update, definition.conf.schema);
      console.log(this.userId, 'has modified document', documentId, 'from collection', definition.name);
      definition.conf.collection.update(documentId, update);
    } catch (error) {
      console.warn('Error updating document', error);
      // Relaunch error done by this function
      if (error.error === 'admin') {
        throw error;
      }
      throw new Meteor.Error('admin', error.toString());
    }
  },
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
