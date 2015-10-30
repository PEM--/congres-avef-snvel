Template.formCancelSubmitButtons.helpers({
  cancelUrl: function() {
    const currentRoute = Session.get('collectionRoute');
    if (currentRoute) {
      return `/dashboard/content/${currentRoute}`;
    }
    return '/dashboard/';
  }
});
