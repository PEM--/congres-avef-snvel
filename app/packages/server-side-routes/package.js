Package.describe({
  name: 'pierreeric:server-side-routes',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('METEOR@1.2-rc.17');
  // NPM dependencies
  Npm.depends({
    "body-parser": "1.13.3"
  });
  // Dependencies of this package
  api.use([
    'pierreeric:namespaces',
    'pierreeric:logger'
  ]);
  // Dependencies server only
  api.use([
    'meteorhacks:npm@1.5.0',
    'meteorhacks:picker@1.0.3'
  ], 'server');
  // Included files in this packages
  // Server only
  api.addFiles(['server-side-routes.js'], 'server');
});
