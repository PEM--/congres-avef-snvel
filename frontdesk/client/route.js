Router.configure({
  fastRender: true
});

// Create a global router controller
MainController = RouteController.extend({
  layoutTemplate: 'mainLayout',
});

// Routes working on the MainController
[
  {url: '/frontdesk', options: {name: 'home'}},
  {url: '/frontdesk/session', options: {name: 'session'}},
  {url: '/frontdesk/checkin', options: {name: 'checkin'}}
].forEach(rt => {
  let obj = _.extend({controller: 'MainController'}, rt.options);
  Router.route(rt.url, obj);
});

if (Meteor.isClient) {
  Meteor.startup(function() {
    Router.go('/frontdesk');
  });
}

AccountsTemplates.configure({
  defaultLayout: 'mainLayout',
});
