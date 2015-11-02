Session.setDefault('selectedDay', null);
Session.setDefault('selectedHour', null);
Session.setDefault('selectedProgram', null);

Template.session.onDestroyed(function() {
  $('select').material_select('destroy');
});

Template.session.helpers({
  isAllSubsReady() {
    return Session.get('allSubsReady');
  },
  dayValues() {
    const instance = Template.instance();
    // const allSubsReady = Session.get('allSubsReady');
    // if (allSubsReady) {
    //   Meteor.setTimeout(() => {instance.$('select').material_select();}, 32);
    //   const values = _.unique(_.pluck(SD.Structure.programs.collection.find().fetch(), 'day'));
    //   console.log('Values', SD.Structure.programs.collection.find().fetch(), values);
    //   return values;
    // }
    Meteor.setTimeout(() => {instance.$('select.days').material_select();}, 32);
    const selectedDay = Session.get('selectedDay');
    values = [
      {value: '', selected: selectedDay ? false : null, label: 'Sélectionner une journée'},
      {value: 'Lundi', selected: selectedDay === 'Lundi', label: 'Lundi'},
      {value: 'Mardi', selected: selectedDay === 'Mardi', label: 'Mardi'},
      {value: 'Mercredi', selected: selectedDay === 'Mercredi', label: 'Mercredi'},
      {value: 'Jeudi', selected: selectedDay === 'Jeudi', label: 'Jeudi'}
    ];
    return values;
  },
  isHourSelectable() {
    return Session.get('selectedDay') !== null;
  },
  isProgramSelectable() {
    return Session.get('selectedHour') !== null;
  }
});

Template.session.events({
  'change select.days': function(e, t) {
    Session.set('selectedDay', e.target.value === '' ? null : e.target.value);
    Session.set('selectedHour', null);
    Session.set('selectedProgram', null);
  },
  'change select.hours': function(e, t) {
    Session.set('selectedHour', e.target.value === '' ? null : e.target.value);
    Session.set('selectedProgram', null);
  },
  'change select.programs': function(e, t) {
    Session.set('selectedProgram', e.target.value === '' ? null : e.target.value);
    if (e.target.value !== '') {
      Router.go('checkin');
    }
  }
});
