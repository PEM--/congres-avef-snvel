Package.describe({
  name: 'pierreeric:client-menu',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'pierreeric:routing-start',
    'pierreeric:basereactmeteor',
    'pierreeric:sharedstyles',
    'pierreeric:col-users-and-roles'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-menu.jsx'
  ]);
});
