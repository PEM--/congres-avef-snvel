Router.configure({ fastRender: true });

// Create a global router controller
MainController = RouteController.extend({ layoutTemplate: 'mainLayout' });

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
    Router.go('home');
  });
}

// Accounts configuration
AccountsTemplates.configure({ defaultLayout: 'mainLayout' });
AccountsTemplates.configureRoute('signIn', {
  path: '/frontdesk/sign-in',
  redirect() { if (Meteor.user()) { Router.go('session'); } }
});
AccountsTemplates.configureRoute('signUp', {
  path: '/frontdesk/sign-up',
  redirect() { if (Meteor.user()) { Router.go('session'); } }
});
// Prevent routing when not connected except on login (home)
Router.plugin('ensureSignedIn', { except: ['home', 'atSignIn', 'atSignUp'] });
// Alerts on Login success or failure
if (Meteor.isClient) {
  // Set a global session for waiting on all data subscription
  Session.setDefault('allSubsReady', false);
  // When login is OK, get all subscription
  Accounts.onLogin(function() {
    sAlert.success('Identification réussie');
    globalSubManager.subscribe('UserAndPrograms');
    Tracker.autorun(function() {
      if (globalSubManager.ready()) {
        console.log('All subscription ready');
        Session.set('allSubsReady', true);
      }
    });
  });
  Accounts.onLoginFailure(function() { sAlert.error('Problème d\'identification'); });
}
