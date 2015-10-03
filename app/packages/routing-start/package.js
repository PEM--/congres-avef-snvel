Package.describe({
  name: 'pierreeric:routing-start',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'ecmascript',
    'es5-shim',
    'session',
    'kadira:flow-router-ssr@3.3.0',
    'okgrow:analytics@0.4.1',
    'spacedrop:namespaces',
    'pierreeric:logger'
  ];
  api.use([
    'meteorhacks:fast-render@2.10.0',
    'gadicohen:robots-txt@0.0.10',
    'velocityjs:velocityjs@1.2.1'
  ].concat(shared));
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles('routing-start.js');
  // Files for client only
  api.addFiles('scroll-history.js', 'client');
  // Files for server only
  api.addFiles('robots.js', 'server');
});
