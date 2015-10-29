Template.collectionTpl.onRendered(function() {
  this.autorun(() => {
    const currentRoute = Session.get('collectionRoute');
    const routeDef = _.find(SharedTablesDefinition, route => {
      return route.name.toLowerCase() === currentRoute;
    });
    if (!routeDef) {
      console.warn('Adresse invalide', currentRoute);
      sAlert.error('Adresse invalide');
    }
    const title = routeDef.conf.title;
    $('.main-title').children().text(title);
  });
});
