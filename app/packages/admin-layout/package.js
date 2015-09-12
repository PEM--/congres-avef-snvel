Package.describe({
  name: 'pierreeric:admin-layout',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react',
    'flemay:less-autoprefixer',
    'pierreeric:namespaces'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'admin-layout.jsx',
    'admin-layout.less'
  ]);
});
