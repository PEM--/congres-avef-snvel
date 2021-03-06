Package.describe({
  name: 'pierreeric:client-footer',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'pierreeric:basereactmeteor',
    'pierreeric:col-basicpages',
    'pierreeric:col-sociallinks',
    'pierreeric:sharedstyles'
  ]);
  // Dependencies for server only
  api.use([], 'server');
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'logger.js',
    'client-footer-basicpages.jsx',
    'client-footer-sociallinks.jsx',
    'client-footer.jsx'
  ]);
});
