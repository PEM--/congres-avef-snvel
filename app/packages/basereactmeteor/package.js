Package.describe({
  name: 'pierreeric:basereactmeteor',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'react@0.14.1_1',
    'ecmascript',
    'es5-shim',
    'pierreeric:logger',
    'spacedrop:namespaces'
  ];
  api.use(shared);
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'basereactmeteor.jsx',
  ]);
});
