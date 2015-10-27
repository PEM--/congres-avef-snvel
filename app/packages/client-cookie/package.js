Package.describe({
  name: 'pierreeric:client-cookie',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'tracker',
    'session',
    'chuangbo:cookie@1.1.0'
  ];
  api.use(shared.concat([
    'chuangbo:cookie@1.1.0',
    'pierreeric:basereactmeteor'
  ]));
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-cookie.jsx'
  ]);
  // Files for client only
  api.addFiles([
    'cookie.js'
  ], 'client');
});
