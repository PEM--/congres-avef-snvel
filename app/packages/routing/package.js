Package.describe({
  name: 'pierreeric:routing',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  var shared = [
    'kadira:flow-router-ssr',
    'meteorhacks:fast-render',
    'pierreeric:namespaces',
    'pierreeric:logger'
  ];
  api.use(shared);
  api.imply(shared);
  // Included files in this packages
  // Files for server only
  api.addFiles([
    'routing.js'
  ], ['server']);
});
