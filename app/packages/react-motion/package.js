Package.describe({
  name: 'pierreeric:react-motion',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // NPM dependencies
  Npm.depends({
    'react-motion': '0.2.7',
    'exposify': '0.4.3'
  });
  // Dependencies of this package
  // Client only
  api.use([
    'meteor-platform',
    'react',
    'cosmos:browserify@0.5.0'
  ], 'client');
  api.imply([
    'react'
  ], 'client');

  // Included files in this packages
  // Server only
  api.addFiles([
    'react-motion.js'
  ], 'server');
  // Client only
  api.addFiles([
    'react-motion.browserify.js',
    'react-motion.browserify.options.json'
  ], 'client');
  // Exported symbols outside the scope of this package
  // Server and client
  //api.export(['ReactMotion']);
  api.export(['ReactMotion'], 'server');
});
