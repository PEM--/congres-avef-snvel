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
    'pierreeric:routing',
    'pierreeric:namespaces',
    'pierreeric:basic-pages-core',
    'flemay:less-autoprefixer'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-basicpages.jsx',
    'client-basicpages.less'
  ]);
});
