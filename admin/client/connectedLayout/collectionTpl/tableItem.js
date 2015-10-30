Template.tableItem.events({
  'click .edit': function(e, t) {
    e.preventDefault();
    console.log('Edit', this);
  },
  'click .remove': function(e, t) {
    e.preventDefault();
    console.log('Remove', this);
    let currentDoc = this;
    $('.ui.modal.delete-action').modal({
      closable: true,
      onApprove: function() {
        console.log('Removing', currentDoc);
        Meteor.call('removeDocument', currentDoc._id, Session.get('collectionRoute'), function(error) {
          if (error) {
            return sAlert.error(error.toString());
          }
          sAlert.success('Document effacé');
        });
      }
    })
    .modal('show');
  }
});
