Router.configure({
  fastRender: true
});

// Create a global router controller
MainController = RouteController.extend({
  layoutTemplate: 'mainLayout',
});

// Main application (outside the logged routes)
// Routes working on the MainController
[
  {url: '/frontdesk', options: {name: 'home'}}
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
