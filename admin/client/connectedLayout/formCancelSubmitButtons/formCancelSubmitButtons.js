Template.formCancelSubmitButtons.helpers({
  cancelUrl: function() {
    const currentRoute = Session.get('collectionRoute');
    if (currentRoute) {
      return FlowRouter.path(`/dashboard/content/${currentRoute}`);
    }
    return FlowRouter.path('/dashboard/');
  },
  isModify: function() {
    return Session.get('documentRoute') !== 'new';
  }
});
