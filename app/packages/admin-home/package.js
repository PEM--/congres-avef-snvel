Package.describe({
  name: 'pierreeric:admin-home',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('METEOR@1.2-rc.14');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react@0.1.12',
    'kadira:react-layout@1.3.0',
    'pierreeric:namespaces',
    'pierreeric:logger',
    'pierreeric:routing-start',
    'pierreeric:admin-layout',
    'flemay:less-autoprefixer@1.1.0',
    'pierreeric:client-sharedstyles'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'admin-home.jsx',
    'admin-home.less'
  ]);
});
