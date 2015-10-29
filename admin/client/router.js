FlowRouter.wait();

FlowRouter.route('/', {
  name: 'login',
  triggersEnter: [
    function(context, redirect) {
      if (Meteor.userId() &&
        Roles.userIsInRole(Meteor.userId(), 'admin')
      ) {
        FlowRouter.go('/dashboard');
      }
    }
  ],
  action() {
    BlazeLayout.render('mainLayout', {main: 'login'});
  }
});

// Automatically go to dashboard or login screen
Tracker.autorun(function(computation) {
  const userId = Meteor.userId();
  if (!computation.firstRun) {
    if (userId) {
      if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
        FlowRouter.go('/dashboard');
      } else {
        sAlert.error('Deconnexion: droits administratifs manquants');
        Meteor.logout();
        FlowRouter.go('/');
      }
    } else {
      FlowRouter.go('/');
    }
  }
});

let dashboardRoutes = FlowRouter.group({
  prefix: '/dashboard',
  name: 'dashboard',
  triggersEnter: [
    function(context, redirect) {
      if (!Meteor.userId() ||
        !Roles.userIsInRole(Meteor.userId(), 'admin')
      ) {
        console.warn('User', Meteor.userId(), 'Roles', Roles.userIsInRole(Meteor.userId(), 'admin'));
        sAlert.error('Connexion requise');
        FlowRouter.redirect('/');
      }
    }
  ]
});

const connectedRoutes = [
  {route: '/', tpl: 'dashboard'},
  {route: '/settings', tpl: 'settings'},
  {route: '/monitor', tpl: 'monitor'}
];

const setDynamicRoutes = () => {
  connectedRoutes.forEach(route => {
    dashboardRoutes.route(route.route, {
      action() {
        console.log('Render route', route.route);
        BlazeLayout.render('connectedLayout', { header: 'header', menu: 'menu', main: route.tpl});
      }
    });
  });
  console.log('All routes declared');
  FlowRouter.initialize();
};

setDynamicRoutes();
