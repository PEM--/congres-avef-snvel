Package.describe({
  name: 'pierreeric:col-sociallinks',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.1');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'pierreeric:namespaces'
  ];
  api.use([
    'underscore',
    'ecmascript',
    'aldeed:collection2@2.5.0',
    'dburles:collection-helpers@1.0.3',
    'pierreeric:subscription-cache',
    'pierreeric:col-basecollection'
  ].concat(shared));
  api.imply(shared);
  // Dependencies for server only
  api.use(['pierreeric:markdown-server-side'], 'server');
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'col-sociallinks.js',
  ]);
});
