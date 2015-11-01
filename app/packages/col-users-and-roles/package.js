Package.describe({
  name: 'pierreeric:col-users-and-roles',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'alanning:roles@1.2.14'
  ];
  api.use(shared.concat([
    'accounts-password',
    'accounts-base',
    'spacedrop:basecollection',
    'pierreeric:internationalization',
    'pierreeric:logger',
    'pierreeric:col-subscribers'
  ]));
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'col-users-and-roles.js',
  ]);
});
