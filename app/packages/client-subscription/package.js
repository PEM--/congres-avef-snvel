Package.describe({
  name: 'pierreeric:client-subscription',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'tracker',
    'jquery',
    'underscore',
    'momentjs:moment@2.10.6',
    'underscorestring:underscore.string@3.2.2',
    'alanning:roles@1.2.14',
    'mquandalle:bower@1.5.2',
    'kadira:react-layout@1.3.1',
    'flemay:less-autoprefixer@1.1.0',
    'gadicohen:reactive-window@1.0.6',
    'pierreeric:basereactmeteor',
    'pierreeric:routing-start',
    'pierreeric:internationalization',
    'pierreeric:main-layout',
    'pierreeric:client-sharedstyles',
    'pierreeric:client-socialsharers',
    'pierreeric:client-errormessage',
    'pierreeric:client-widgets',
    'pierreeric:col-users-and-roles',
    'pierreeric:col-subscribers',
    'pierreeric:col-dictionary',
    'pierreeric:client-cookie',
    'pierreeric:col-pricings',
    'pierreeric:col-discounts',
    'pierreeric:col-products',
    'pierreeric:invoice'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'logger.js',
    'step1.jsx',
    'step2.jsx',
    'step3city.jsx',
    'step3job.jsx',
    'step3subscriber.jsx',
    'step3program.jsx',
    'step3day.jsx',
    'step3product.jsx',
    'step3.jsx',
    'step4.jsx',
    'report.jsx',
    'client-subscription.jsx',
    'client-subscription.less'
  ]);
  // Files for client only
  api.addFiles([
    'bower.json'
  ], 'client');
});
