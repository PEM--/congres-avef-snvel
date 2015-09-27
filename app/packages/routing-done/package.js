Package.describe({
  name: 'pierreeric:routing-done',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react',
    'ecmascript',
    'es5-shim',
    'underscore',
    'kadira:flow-router-ssr@3.3.0',
    'kadira:react-layout@1.3.1',
    'meteorhacks:fast-render@2.10.0',
    'underscorestring:underscore.string@3.2.2',
    'gadicohen:sitemaps@0.0.23',
    'spacedrop:namespaces',
    'pierreeric:logger'
  ]);
  // Included files in this packages
  // Files for client only
  api.addFiles('routing-done.jsx');
});
