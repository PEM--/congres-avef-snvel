Package.describe({
  name: 'pierreeric:routing-done',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('METEOR@1.2-rc.14');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'pierreeric:namespaces',
    'pierreeric:logger'
  ];
  api.use([
    'underscore',
    'kadira:flow-router-ssr@3.3.0',
    'meteorhacks:fast-render@2.10.0',
    'underscorestring:underscore.string@3.2.2',
    'gadicohen:sitemaps@0.0.23'
  ].concat(shared));
  api.imply(shared);
  // Included files in this packages
  // Files for client only
  api.addFiles('routing-done.js');
});
