Package.describe({
  name: 'pierreeric:admin-home',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'kadira:react-layout@1.4.1',
    'flemay:less-autoprefixer@1.2.0',
    'pierreeric:basereactmeteor',
    'pierreeric:routing-start',
    'pierreeric:admin-layout',
    'pierreeric:sharedstyles'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'admin-home.jsx',
    'admin-home.less'
  ]);
});
