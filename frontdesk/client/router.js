Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.map(function() {
  this.route('home', {
    path: '/fontdesk'
  });
});

Meteor.startup(function() {
  Router.go('/fontdesk');
});
