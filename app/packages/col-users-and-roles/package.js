Package.describe({
  name: 'pierreeric:col-users-and-roles',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'alanning:roles@1.2.13'
  ];
  api.use(shared.concat([
    'accounts-password',
    'spacedrop:basecollection',
    'pierreeric:internationalization',
    'pierreeric:logger',
    'pierreeric:routing-start'
  ]));
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'col-users-and-roles.js',
  ]);
});
