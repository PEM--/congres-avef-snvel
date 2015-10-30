FlowRouter.wait();

FlowRouter.route('/', {
  name: 'login',
  // triggersEnter: [
  //   function(context, redirect) {
  //     if (Meteor.userId() &&
  //       Roles.userIsInRole(Meteor.userId(), 'admin')
  //     ) {
  //       FlowRouter.go('/dashboard');
  //     }
  //   }
  // ],
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
  // triggersEnter: [
  //   function(context, redirect) {
  //     if (!Meteor.userId() ||
  //       !Roles.userIsInRole(Meteor.userId(), 'admin')
  //     ) {
  //       console.warn('User', Meteor.userId(), 'Roles', Roles.userIsInRole(Meteor.userId(), 'admin'));
  //       sAlert.error('Connexion requise');
  //       FlowRouter.redirect('/');
  //     }
  //   }
  // ]
});

Session.setDefault('collectionRoute', null);
Session.setDefault('documentRoute', null);

const connectedRoutes = [
  {route: '/', tpl: 'dashboard'},
  {route: '/settings', tpl: 'settings'},
  {route: '/monitor', tpl: 'monitor'},
  {
    route: '/content/:collection',
    action(params, queryParams) {
      Session.set('collectionRoute', params.collection);
      BlazeLayout.render('connectedLayout', { header: 'header', menu: 'menu', main: 'collectionTpl'});
    }
  },
  {
    route: '/content/:collection/:document',
    action(params, queryParams) {
      Session.set('collectionRoute', params.collection);
      Session.set('documentRoute', params.document);
      BlazeLayout.render('connectedLayout', { header: 'header', menu: 'menu', main: 'collectionItem'});
    }
  }
];

const setDynamicRoutes = () => {
  connectedRoutes.forEach(route => {
    const action = route.action ? route.action : () => {
      BlazeLayout.render('connectedLayout', { header: 'header', menu: 'menu', main: route.tpl});
    };
    dashboardRoutes.route(route.route, { action });
  });
  console.log('All routes declared');
  FlowRouter.initialize();
};

setDynamicRoutes();
