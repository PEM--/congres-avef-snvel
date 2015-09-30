Package.describe({
  name: 'pierreeric:client-cookie',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'tracker',
    'session'
  ];
  api.use(shared.concat([
    'flemay:less-autoprefixer@1.1.0',
    'pierreeric:basereactmeteor'
  ]));
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-cookie.jsx',
    'client-cookie.less'
  ]);
});