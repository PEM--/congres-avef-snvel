// Server only route for email confirmations

Meteor.startup(() => {
  FlowRouter.route('/confirm/:id', {
    action(params) {
      check(params.id, Meteor.Collection.ObjectID);
      const userId = Meteor.users._collection.findOne(params.id);
      if (!userId) {
        log.warn('Attenpt to confirm an email on unexisting account', userId);
        return FlowRouter.redirect('/notfound');
      }
      log.info('Confirming Email for', params.id);
    }
  });
});
