Package.describe({
  name: 'pierreeric:client-errormessage',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'flemay:less-autoprefixer@1.1.0',
    'pierreeric:basereactmeteor',
    'pierreeric:client-sharedstyles',
    'pierreeric:internationalization'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-errormessage.jsx',
    'client-errormessage.less'
  ]);
});
