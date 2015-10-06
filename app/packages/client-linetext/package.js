Package.describe({
  name: 'pierreeric:client-linetext',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'underscorestring:underscore.string@3.2.2',
    'pierreeric:basereactmeteor',
    'pierreeric:client-sharedstyles',
    'pierreeric:client-spinkit',
    'pierreeric:markdown',
    'pierreeric:col-texts'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-linetext.jsx'
  ]);
});
