Template.collectionTpl.onRendered(function() {
  this.autorun(() => {
    const currentRoute = Session.get('collectionRoute');
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

Template.collectionTpl.helpers({
  tableAvailable() {
    const instance = Template.instance();
    return instance.routeDef && instance.routeDef.name;
  },
  sharedTable() {
    const instance = Template.instance();
    return SharedTables[instance.routeDef.name];
  }
});
