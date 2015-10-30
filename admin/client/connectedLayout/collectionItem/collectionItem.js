Template.collectionItem.onCreated(function() {
  this.dataAvailable = new ReactiveVar(false);
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
    this.subscribe('uniqueItem', currentDocument, currentRoute, {
      onReady: () => {
        console.log('Subscription done');
        this.document = this.routeDef.conf.collection.findOne(currentDocument);
        if (!this.data) {
          console.warn('Document invalide', currentRoute, currentDocument);
          sAlert.error('Document invalide');
          return FlowRouter.go('/dashboard');
        }
        this.dataAvailable.set(true);
      },
      onStop: () => {
        if (!this.dataAvailable.get()) {
          console.warn('Subscription stopped', currentRoute, currentDocument);
          sAlert.error('Document invalide');
          return FlowRouter.go('/dashboard');
        }
      }
    });
  });
});

Template.collectionItem.helpers({
  dataAvailable() {
    const instance = Template.instance();
    console.log('Data available', instance.dataAvailable.get());
    return instance.dataAvailable.get();
  },
  document() {
    const instance = Template.instance();
    return instance.document;
  }
});
