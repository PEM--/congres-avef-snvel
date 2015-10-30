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

Template.collectionTpl.events({
  'click .new': function(e, t) {
    e.preventDefault();
    console.log('New document', e);
  },
  'click .csv': function(e, t) {
    e.preventDefault();
    const data = this.routeDef.conf.collection.find().fetch();
    let csv = '';
    data.forEach(item => csv += '\n' + _.values(sub).join(';'));
    // Automatic download of the CSV as a Blob file
    blobDownload(csv, 'subscribers.csv', 'text/csv');
  }
});
