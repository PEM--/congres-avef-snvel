Package.describe({
  name: 'pierreeric:footer',
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
    'pierreeric:subscription-cache',
    'pierreeric:basic-pages-core',
    'pierreeric:react-motion'
  ]);
  // Dependencies for client only
  api.use([
    'flemay:less-autoprefixer',
  ], 'client');
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'footer.jsx',
  ]);
  // Files for client only
  api.addFiles([
    'footer.less'
  ], 'client');
  // Exported symbols outside the scope of this package
  api.export(['Footer', 'Links']);
});
