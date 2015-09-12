Package.describe({
  name: 'pierreeric:client-sharedstyles',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'flemay:less-autoprefixer'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-sharedstyles.less'
  ]);
});