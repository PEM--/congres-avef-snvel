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
    'kadira:react-layout@1.3.1',
    'flemay:less-autoprefixer@1.1.0',
    'pierreeric:basereactmeteor',
    'pierreeric:routing-start',
    'pierreeric:main-layout',
    'pierreeric:client-sharedstyles'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'logger.js',
    'step1.jsx',
    'step2.jsx',
    'step3.jsx',
    'step4.jsx',
    'report.jsx',
    'client-subscription.jsx',
    'client-subscription.less'
  ]);
});
