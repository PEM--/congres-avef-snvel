Package.describe({
  name: 'pierreeric:emails',
  version: '0.0.1',
  summary: 'Responsibe Email templates',
  git: 'https://github.com/PEM--/congres-avef-snvel/tree/master/app/packages/emails',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');

  // NPM dependencies
  Npm.depends({
    'juice': '1.5.0',
  });

  // Package dependencies
  const sharedServerAndClient = [
    'ecmascript',
    'es5-shim',
    'underscorestring:underscore.string@3.2.2'
  ];
  api.use(sharedServerAndClient.concat([
    'spacedrop:namespaces@0.0.1',
    'pierreeric:logger@0.0.3'
  ]));
  api.imply(sharedServerAndClient);
  const serverOnly = [
    'email',
    'accounts-base',
    'accounts-password'
  ];
  api.use(serverOnly, 'server');
  api.imply(serverOnly, 'server');
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'emails.js'
  ], 'server');
  api.addAssets([
    'templates/styles.css',
    'templates/action.html'
  ], 'server');
  // Exported symbols
  // Symbols for server only
  api.export(['sendConfirmationEmail'], 'server');
});
