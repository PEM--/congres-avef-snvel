Session.setDefault('day', null);
Session.setDefault('hour', null);
Session.setDefault('program', null);

Template.session.onDestroyed(function() {
  $('select').material_select('destroy');
});

Template.session.helpers({
  isAllSubsReady() {
    return Session.get('allSubsReady');
  },
  dayValues() {
    // const instance = Template.instance();
    const allSubsReady = Session.get('allSubsReady');
    // if (allSubsReady) {
    //   Meteor.setTimeout(() => {instance.$('select').material_select();}, 32);
    //   const values = _.unique(_.pluck(SD.Structure.programs.collection.find().fetch(), 'day'));
    //   console.log('Values', SD.Structure.programs.collection.find().fetch(), values);
    //   return values;
    // }
    return [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi'
    ];
  }
});
