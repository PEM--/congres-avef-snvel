Package.describe({
  name: 'pierreeric:decorators',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2');
  const shared = [
    'ecmascript',
    'babel-runtime@0.1.4',
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
