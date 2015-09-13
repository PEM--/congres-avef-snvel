Package.describe({
  name: 'pierreeric:logger',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor version compatibility
  api.versionsFrom('1.0');

  // NPM modules
  Npm.depends({
    'bunyan': '1.4.0',
    'bunyan-format': '0.2.1',
    'stream-browserify': '2.0.1',
    'process': '0.11.2',
    'util': '0.10.3',
    'inherits': '2.0.1',
    'log-with-style': '0.1.5'
  });

  // Dependencies of this package
  // Dependencies for server and client
  var shared = [
    'pierreeric:namespaces',
    'blaze',
    'ui',
    'templating',
    'spacebars',
    'underscore'
  ];
  api.use([
  ].concat(shared));
  // Dependencies for client only
  api.use(['cosmos:browserify@0.5.1'], 'client');
  api.imply(shared);

  // Dependecies used in this package
  // Exported files
  api.addFiles('logger_client.browserify.js', 'client');
  api.addFiles('logger_server.js', 'server');
  api.addFiles('logger_both.js');

  // Exported variables
  api.export(['Tools', 'bunyan']);
  api.export(['process', 'WritableStream', 'inherits', 'logStyle'], 'client');
  api.export('bunyanFormat', 'server');
});
