Package.describe({
  name: 'pierreeric:basereactmeteor',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'react',
    'ecmascript',
    'es5-shim',
    'pierreeric:logger',
    'pierreeric:namespaces'
  ];
  api.use(shared);
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'basereactmeteor.jsx',
  ]);
});
