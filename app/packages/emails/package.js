Package.describe({
  name: 'pierreeric:emails',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2');

  // Package dependencies
  const sharedServerAndClient = [
    'ecmascript',
    'es5-shim'
  ];
  api.use(sharedServerAndClient.concat([
    'spacedrop:namespaces',
    'pierreeric:logger'
  ]));
  api.imply(sharedServerAndClient);
  const serverOnly = [
    'email',
    'yogiben:pretty-email@0.0.6'
  ];
  api.use(serverOnly, 'server');
  api.imply(serverOnly, 'server');
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'emails.js'
  ], 'server');
  // Exported symbols
  // Symbols for server only
  api.export('sendEmail', 'server');
});
