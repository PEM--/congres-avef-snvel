Package.describe({
  name: 'pierreeric:client-layout',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  var sharedDeps = [
    'pierreeric:main-layout',
    'pierreeric:footer'
  ];
  api.use(sharedDeps);
  // Expose packages
  api.imply(sharedDeps);
  // Included files in this packages
  // Files for server and client
  api.addFiles('client-layout.jsx');
  // Exported symbols outside the scope of this package
  api.export('ClientLayout');
});
