Package.describe({
  name: 'pierreeric:client-menu',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.1');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react',
    'flemay:less-autoprefixer@1.1.0',
    'babel-runtime@0.1.4',
    'pierreeric:logger',
    'pierreeric:namespaces',
    'pierreeric:client-sharedstyles'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-menu.jsx',
    'client-menu.less'
  ]);
});
