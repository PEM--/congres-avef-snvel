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
    // Document is being updated
    if (currentDocument !== 'new') {
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
    // This is a new document
    } else {
      this.dataAvailable.set(true);
    }
  });
});

Template.collectionItem.helpers({
  dataAvailable() { return Template.instance().dataAvailable.get(); },
  schema() { return Template.instance().routeDef.conf.schema; },
  document() { return Template.instance().document; }
});

AutoForm.hooks({
  collectionItemInsertOrUpdate: {
    onSubmit(insertDoc, updateDoc, currentDoc) {
      const currentDocument = Session.get('documentRoute');
      // Document is being updated
      if (currentDocument !== 'new') {
        Meteor.call('updateDocument', updateDoc,
          Session.get('documentRoute'), Session.get('collectionRoute'), error => {
            if (error) {
              return this.done(error);
            }
            this.done();
          }
        );
      // This is a new document
      } else {
        console.log('insertDoc', insertDoc);
        Meteor.call('insertDocument', insertDoc, Session.get('collectionRoute'), error => {
          if (error) {
            return this.done(error);
          }
          this.done();
        });
      }
      return false;
    },
    onSuccess() {
      const currentDocument = Session.get('documentRoute');
      if (currentDocument !== 'new') {
        sAlert.success('Document mis à jour');
      } else {
        sAlert.success('Document inséré');
      }
      FlowRouter.go(`/dashboard/content/${Session.get('collectionRoute')}`);
    },
    onError(type, error) {
      const currentDocument = Session.get('documentRoute');
      let errorText = currentDocument !== 'new' ? 'Impossible de mettre à jour le document : ' :
        'Impossible de créer le document : ';
      errorText += error.toString();
      console.warn(errorText);
      sAlert.error(errorText);
    }
  }
});
