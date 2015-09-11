Package.describe({
  name: 'pierreeric:basic-pages-client',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react',
    'pierreeric:routing',
    'pierreeric:basic-pages-core'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'basic-pages-client.jsx'
  ]);
});
