Package.describe({
  name: 'pierreeric:client-landingpage',
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
    'pierreeric:main-layout',
    'pierreeric:sharedstyles',
    'pierreeric:col-partners'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-landingpage.jsx',
    'client-landingpage.less'
  ]);
});
