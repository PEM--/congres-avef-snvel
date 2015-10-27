Package.describe({
  name: 'pierreeric:client-errormessage',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'pierreeric:internationalization'
  ];
  api.use(shared.concat([
    'flemay:less-autoprefixer@1.2.0',
    'pierreeric:basereactmeteor',
    'pierreeric:sharedstyles'
  ]));
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-errormessage.jsx',
    'client-errormessage.less'
  ]);
});
