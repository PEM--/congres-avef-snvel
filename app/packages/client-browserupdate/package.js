Package.describe({
  name: 'pierreeric:client-browserupdate',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.1');
  // NPM dependencies
  Npm.depends({
    'outdated-browser-rework': '1.0.0',
    'exposify': '0.4.3'
  });
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'ecmascript',
    'cosmos:browserify@0.7.0',
  ]);
  // Dependencies for server only
  api.use(['fourseven:scss@3.2.0'], 'server');
  // Included files in this packages
  // Files for client only
  api.addFiles([
    'client-browserupdate.browserify.js',
    'client-browserupdate.browserify.options.json'
  ], 'client');

});
