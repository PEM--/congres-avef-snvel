Package.describe({
  name: 'pierreeric:landing-page',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react',
    'kadira:flow-router-ssr@3.2.1',
    'kadira:react-layout@1.3.0',
    'pierreeric:routing@0.0.1',
    'pierreeric:footer@0.0.1'
  ]);
  // Dependencies for client only
  api.use([
    'flemay:less-autoprefixer@1.1.0'
  ], 'client');
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'home.jsx'
  ]);
  // Files for client only
  api.addFiles([
    'home.less'
  ], 'client');
});
