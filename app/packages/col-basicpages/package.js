Package.describe({
  name: 'pierreeric:col-basicpages',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  var shared = [
    'aldeed:collection2',
    'dburles:collection-helpers@1.0.3',
    'pierreeric:namespaces',
    'pierreeric:logger',
    'pierreeric:subscription-cache'
  ];
  api.use([
    'meteor-platform'
  ].concat(shared));
  api.imply(shared);
  // Dependencies for server only
  api.use(['pierreeric:markdown-server-side'], 'server');
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'col-basicpages.js',
  ]);
});
