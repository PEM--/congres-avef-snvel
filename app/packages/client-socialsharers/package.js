Package.describe({
  name: 'pierreeric:client-socialsharers',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'underscore',
    'flemay:less-autoprefixer@1.1.0',
    'pierreeric:basereactmeteor',
    'pierreeric:client-sharedstyles',
    'pierreeric:routing-start'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-socialsharers.jsx',
    'client-socialsharers.less'
  ]);
});
