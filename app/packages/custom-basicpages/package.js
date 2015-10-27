Package.describe({
  name: 'pierreeric:custom-basicpages',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'ecmascript',
    'es5-shim'
  ]);
  // Included files in this packages
  // Files for server only
  api.addFiles([
    'legal.js',
    'cookie.js',
    'cgv.js',
    'notfound.js'
  ], 'server');
  // Export default basic pages
  api.export([
    'DEFAULT_LEGAL',
    'DEFAULT_COOKIE',
    'DEFAULT_CGV',
    'DEFAULT_NOTFOUND'
  ], 'server');
});
