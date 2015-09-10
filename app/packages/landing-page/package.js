Package.describe({
  name: 'pierreeric:landing-page',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'pierreeric:routing',
    'pierreeric:client-layout'
  ]);
  api.imply([
    'pierreeric:routing',
    'pierreeric:client-layout'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles('landing-page.jsx');
});
