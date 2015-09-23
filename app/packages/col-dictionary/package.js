Package.describe({
  name: 'pierreeric:col-dictionary',
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
    'pierreeric:col-basecollection'
  ].concat(shared));
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'col-dictionary.js',
  ]);
});
