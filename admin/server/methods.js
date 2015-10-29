Meteor.methods({
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
      throw new Meteor.Error('admin', error.toString());
    }
  }
});
