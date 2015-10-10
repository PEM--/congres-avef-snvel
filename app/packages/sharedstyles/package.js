Package.describe({
  name: 'pierreeric:sharedstyles',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'ecmascript',
    'es5-shim',
    'flemay:less-autoprefixer@1.1.0',
    'underscorestring:underscore.string@3.2.2',
    'spacedrop:namespaces'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'sharedstyles.js',
    'sharedstyles.less'
  ]);
  api.export([ColorTheme, Fonts], ['server', 'client']);
});
