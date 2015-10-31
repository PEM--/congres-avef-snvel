Package.describe({
  name: 'pierreeric:qr-user-images',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // NPM dependencies
  Npm.depends({
    'qr-image': '3.1.0'
  });
  // Dependencies of this package
  // Server only
  const shared = [
    'ecmascript',
    'es5-shim',
    'check',
    'spacedrop:namespaces',
    'pierreeric:logger',
    'pierreeric:col-users-and-roles'
  ];
  api.use(shared, 'server');
  api.imply(shared, 'server');
  // Included files in this packages
  api.addFiles('qr-user-images.js', 'server');
});
