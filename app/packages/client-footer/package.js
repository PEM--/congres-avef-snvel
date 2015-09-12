Package.describe({
  name: 'pierreeric:client-footer',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'meteor-platform',
    'react',
    'flemay:less-autoprefixer',
    'pierreeric:col-basicpages',
    'pierreeric:namespaces'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-footer.jsx',
    'client-footer.less'
  ]);
});
