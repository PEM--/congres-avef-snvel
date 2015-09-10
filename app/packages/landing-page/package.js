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
    'pierreeric:routing',
    'kadira:react-layout',
    'pierreeric:footer'
  ]);
  api.imply([
    'kadira:flow-router-ssr',
    'meteorhacks:fast-render'
  ]);
  // Dependencies for client only
  api.use([
    'flemay:less-autoprefixer'
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
