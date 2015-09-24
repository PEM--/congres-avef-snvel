Package.describe({
  name: 'pierreeric:admin-layout',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.1');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'flemay:less-autoprefixer@1.1.0',
    'react',
    'pierreeric:namespaces',
    'pierreeric:logger'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'admin-layout.jsx',
    'admin-layout.less'
  ]);
});
