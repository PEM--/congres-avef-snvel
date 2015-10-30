Template.collectionItem.onCreated(function() {
  this.autorun(() => {
    const currentRoute = Session.get('collectionRoute');
    const currentDocument = Session.get('documentRoute');
    this.routeDef = _.find(SharedTablesDefinition, route => {
      return route.name.toLowerCase() === currentRoute;
    });
    if (!this.routeDef) {
      console.warn('Adresse invalide', currentRoute);
      sAlert.error('Adresse invalide');
      return FlowRouter.go('/dashboard');
    }
    const title = this.routeDef.conf.title;
    $('.main-title').children().text(title);
    this.subscribe(`${currentRoute}All`);
  });

});




Template.collectionItem.helpers({
  dataAvailable() {
    return false;
  }
});
