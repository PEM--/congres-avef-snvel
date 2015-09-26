Package.describe({
  name: 'pierreeric:markdown-server-side',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2');
  // NPM dependencies
  Npm.depends({
    'marked': '0.3.5',
    'highlight.js': '8.8.0'
  });
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'ecmascript',
    'es5-shim'
  ]);
  // Included files in this packages
  // Server only
  api.addFiles([
    'markdown-server-side.js'
  ], 'server');
  // Exported symbols outside the scope of this package
  // Server only
  api.export(['marked'], 'server');
});
