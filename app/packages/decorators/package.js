Package.describe({
  name: 'pierreeric:decorators',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('METEOR@1.2-rc.17');
  // Included files in this packages
  // Files for server and client
  api.addFiles('decorators.js');
  // Exported symbols
  // Symbols for server and client
  api.export('optionsAsThis');
});
