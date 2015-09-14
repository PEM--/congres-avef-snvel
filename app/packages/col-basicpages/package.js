Package.describe({
  name: 'pierreeric:col-basicpages',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('METEOR@1.2-rc.14');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'pierreeric:namespaces',
    'pierreeric:logger',
    'pierreeric:subscription-cache'
  ];
  api.use([
    'underscore',
    'ecmascript',
    'aldeed:collection2@2.5.0',
    'dburles:collection-helpers@1.0.3'
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
