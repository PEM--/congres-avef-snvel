Package.describe({
  name: 'pierreeric:col-subscribers',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use('spacedrop:basecollection');
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'col-subscribers.js',
  ]);
  api.addAssets(['subscribers.csv'], 'server');
});
