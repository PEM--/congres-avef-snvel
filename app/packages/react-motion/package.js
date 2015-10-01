Package.describe({
  name: 'pierreeric:react-motion',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // NPM dependencies
  Npm.depends({
    'react-motion': '0.2.7',
    'exposify': '0.4.3'
  });
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react'
  ]);
  // Dependencies for client only
  const sharedClient = [
    'cosmos:browserify@0.8.0'
  ];
  api.use(sharedClient, 'client');
  api.imply(sharedClient, 'client');

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
  api.export(['ReactMotion']);
});
