Package.describe({
  name: 'pierreeric:routing-start',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  var shared = [
    'kadira:flow-router-ssr@3.3.0',
    'meteorhacks:fast-render@2.10.0',
    'gadicohen:sitemaps@0.0.23',
    'gadicohen:robots-txt@0.0.10',
    'pierreeric:namespaces',
    'pierreeric:logger'
  ];
  api.use(shared);
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles('routing-start.js');
  // Files for server only
  api.addFiles([
    'robots.js',
    'sitemaps.js'
  ]);
});
