Package.describe({
  name: 'pierreeric:col-basicpages',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  api.use('spacedrop:basecollection');
  // Dependencies for server only
  api.use([
    'pierreeric:custom-basicpages'
  ], 'server');
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'col-basicpages.js',
  ]);
});
