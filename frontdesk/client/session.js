Session.setDefault('selectedDay', null);
Session.setDefault('selectedHour', null);
Session.setDefault('selectedSession', null);

Template.session.onDestroyed(function() {
  $('select').material_select('destroy');
});

Template.session.helpers({
  isAllSubsReady() {
    return Session.get('allSubsReady');
  },
  dayValues() {
    const instance = Template.instance();
    Meteor.setTimeout(() => {instance.$('select.days').material_select();}, 32);
    const selectedDay = Session.get('selectedDay');
    values = [
      {value: '', selected: selectedDay === null ? true : false, label: 'Sélectionner une journée'},
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
  hourValues() {
    const instance = Template.instance();
    const allSubsReady = Session.get('allSubsReady');
    if (allSubsReady) {
      Meteor.setTimeout(() => {instance.$('select.hours').material_select();}, 32);
      const allHours = SD.Structure.programs.collection.find(
        {day: Session.get('selectedDay')},
        {sort: ['begin']}
      ).fetch();
      const selectedHour = Session.get('selectedHour');
      let values = [
        {value: '', selected: selectedHour === null ? true : false, label: 'Sélectionner un horraire'}
      ];
      allHours.forEach(hour => {
        values.push(
          {value: hour.begin, selected: selectedHour === hour.begin, label: `${hour.begin} - ${hour.end}`}
        );
      });
      return values;
    }
    return [];
  },
  isSessionSelectable() {
    return Session.get('selectedHour') !== null;
  },
  sessionValues() {
    const instance = Template.instance();
    const allSubsReady = Session.get('allSubsReady');
    if (allSubsReady) {
      Meteor.setTimeout(() => {instance.$('select.sessions').material_select();}, 32);
      const allSessions = SD.Structure.programs.collection.find(
        {day: Session.get('selectedDay'), begin: Session.get('selectedHour')},
        {sort: ['begin']}
      ).fetch();
      const selectedSession = Session.get('selectedSession');
      let values = [
        {value: '', selected: selectedSession === null ? true : false, label: 'Sélectionner un programme'}
      ];
      allSessions.forEach(session => {
        values.push(
          {value: session._id, selected: selectedSession === session._id, label: session.session}
        );
      });
      return values;
    }
    return [];
  }
});

Template.session.events({
  'change select.days': function(e, t) {
    Session.set('selectedDay', e.target.value === '' ? null : e.target.value);
    Session.set('selectedHour', null);
    Session.set('selectedSession', null);
  },
  'change select.hours': function(e, t) {
    Session.set('selectedHour', e.target.value === '' ? null : e.target.value);
    Session.set('selectedSession', null);
  },
  'change select.sessions': function(e, t) {
    Session.set('selectedSession', e.target.value === '' ? null : e.target.value);
    if (e.target.value !== '') {
      Meteor.setTimeout(() => Router.go('checkin'), 64);
    }
  }
});
