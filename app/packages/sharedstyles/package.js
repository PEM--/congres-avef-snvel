Package.describe({
  name: 'pierreeric:sharedstyles',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'ecmascript',
    'es5-shim',
    'underscorestring:underscore.string@3.2.2',
    'spacedrop:namespaces'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'sharedstyles.js'
  ]);
  api.export(['ColorTheme', 'Fonts']);
});
