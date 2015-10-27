Package.describe({
  name: 'pierreeric:payment',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');

  // Package dependencies
  // Server and client
  const sharedServerAndClient = [
    'ecmascript',
    'es5-shim',
    'underscore',
    'momentjs:moment@2.10.6',
    'underscorestring:underscore.string@3.2.2',
    'mquandalle:bower@1.5.2',
    'aldeed:simple-schema@1.3.3',
    'numeral:numeral@1.5.3_1',
    'alanning:roles@1.2.14'
  ];
  api.use(sharedServerAndClient.concat([
    'spacedrop:namespaces',
    'pierreeric:logger@0.1.0',
    'pierreeric:invoice',
    'pierreeric:internationalization',
    'pierreeric:col-basicpages',
    'pierreeric:markdown',
    'pierreeric:emails'
  ]));
  api.imply(sharedServerAndClient);
  // Server only
  const serverOnly = [
    'patrickml:braintree@1.29.0'
  ];
  api.use(serverOnly, 'server');
  api.imply(serverOnly, 'server');
  // Files for server and client
  api.addFiles([
    'logger.js',
    'cardvalidation.js'
  ]);
  // Files for server only
  api.addFiles([
    'braintree_server.js'
  ], 'server');
  // Files for client only
  api.addFiles([
    'bower.json'
  ], 'client');
});
