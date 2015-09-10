Package.describe({
  name: 'pierreeric:routing',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'kadira:flow-router-ssr',
    'meteorhacks:fast-render'
  ]);
  api.imply([
    'kadira:flow-router-ssr',
    'meteorhacks:fast-render'
  ]);
  // Included files in this packages
  // Files for server only
  api.addFiles([
    'routing.js'
  ], ['server']);
});
