Package.describe({
  name: 'pierreeric:decorators',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2');
  const shared = [
    'ecmascript',
    'es5-shim'
  ];
  api.use(shared);
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles('decorators.js');
  // Exported symbols
  // Symbols for server and client
  api.export('optionsAsThis');
});
