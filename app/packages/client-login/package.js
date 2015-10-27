Package.describe({
  name: 'pierreeric:client-login',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'accounts-base',
    'kadira:react-layout@1.4.1',
    'pierreeric:basereactmeteor',
    'pierreeric:routing-start',
    'pierreeric:main-layout',
    'pierreeric:sharedstyles',
    'pierreeric:col-users-and-roles',
    'pierreeric:client-errormessage',
    'pierreeric:client-widgets'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-login.jsx'
  ]);
});
