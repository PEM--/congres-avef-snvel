Package.describe({
  name: 'pierreeric:custom-texts',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'ecmascript',
    'es5-shim'
  ]);
  // Included files in this packages
  // Server and client
  api.addFiles('custom-texts.js');
  // Export default basic pages
  api.export('ALL_TEXTS', 'server');
});
