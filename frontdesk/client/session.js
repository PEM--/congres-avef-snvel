Session.setDefault('day', null);
Session.setDefault('hour', null);
Session.setDefault('program', null);

Template.session.onCreated(function() {
  this.dayReady = new ReactiveVar(false);
  this.hourReady = new ReactiveVar(false);
  this.programReady = new ReactiveVar(false);
  globalSubManager.subscribe('ProgramsAll', {
    onReady: () => {
      console.log('Subscibed');
      this.programs = SD.Structure.programs.collection.find().fetch();
      this.dayReady.set(true);
    }
  });
});

Template.session.onRendered(function() {
  $('select').material_select();
});

Template.session.onDestroyed(function() {
  $('select').material_select('destroy');
});

Template.session.helpers({
  isProgramsLoaded() {
    const instance = Template.instance();
    return instance.dayReady.get();
  },
  dayValues() {
    const instance = Template.instance();
    return _.chain(instance.programs).pluck('day').unique().value();
  }
});
