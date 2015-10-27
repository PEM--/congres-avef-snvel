Package.describe({
  name: 'pierreeric:client-browserupdate',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // NPM dependencies
  Npm.depends({
    'outdated-browser-rework': '1.0.0',
    'exposify': '0.4.3'
  });
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'cosmos:browserify@0.8.1',
    'flemay:less-autoprefixer@1.2.0',
    'pierreeric:basereactmeteor'
  ]);
  // Included files in this packages
  // Files for client only
  api.addFiles([
    'client-browserupdate.less',
    'client-browserupdate.browserify.js',
    'client-browserupdate.browserify.options.json'
  ], 'client');
});
