Package.describe({
  name: 'pierreeric:client-widgets',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'es5-shim',
    'ecmascript',
    'react@0.14.1_1',
    'spacedrop:namespaces',
    'pierreeric:logger',
    'pierreeric:sharedstyles'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-widgets.jsx'
  ]);
});
