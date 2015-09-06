Package.describe({
  name: 'pierreeric:landing-page',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use([
    'react',
    'kadira:flow-router@2.5.0',
    'kadira:react-layout@1.3.0'
  ], 'client');
  api.addFiles([
    'home.jsx'
  ], 'client');
});
