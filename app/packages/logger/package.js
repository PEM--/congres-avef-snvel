Package.describe({
  name: 'pierreeric:logger',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');

  // NPM modules
  Npm.depends({
    'bunyan': '1.5.1',
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
    'react@0.1.10',
    'pierreeric:namespaces'
  ];
  api.use(shared);
  api.imply(shared);
  // Dependencies for client only
  api.use(['cosmos:browserify@0.5.1'], 'client');

  // Included files in this packages
  // Files for client only
  api.addFiles('logger_client.browserify.js', 'client');
  // Files for server only
  api.addFiles('logger_server.js', 'server');
  // Files for server and client
  var files = ['logger_both_loglevel_debug.jsx'];
  if (process.env.NODE_ENV === 'production') {
    files = ['logger_both_loglevel_info.jsx'];
  }
  api.addFiles(files.concat(['logger_both.jsx']));
});
