Package.describe({
  name: 'pierreeric:client-basicpages',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react',
    'kadira:react-layout@1.3.0',
    'pierreeric:routing',
    'pierreeric:namespaces',
    'pierreeric:col-basicpages',
    'flemay:less-autoprefixer@1.1.0',
    'pierreeric:main-layout',
    'pierreeric:client-sharedstyles'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-basicpages.jsx',
    'client-basicpages.less'
  ]);
});
