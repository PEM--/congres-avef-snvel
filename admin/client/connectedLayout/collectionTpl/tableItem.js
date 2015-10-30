Template.tableItem.events({
  'click .edit': function(e, t) {
    e.preventDefault();
    FlowRouter.go(`/dashboard/content/${Session.get('collectionRoute')}/${this._id}`);
    console.log('Editing', this, 'in', Session.get('collectionRoute'));
  },
  'click .remove': function(e, t) {
    e.preventDefault();
    let currentDoc = this;
    $('.ui.modal.delete-action').modal({
      closable: true,
      onApprove: function() {
        Meteor.call('removeDocument', currentDoc._id, Session.get('collectionRoute'), function(error) {
          if (error) {
            return sAlert.error(error.toString());
          }
          console.log(currentDoc, 'removed from', Session.get('collectionRoute'));
          sAlert.success('Document effacé');
        });
      }
    })
    .modal('show');
  }
});
