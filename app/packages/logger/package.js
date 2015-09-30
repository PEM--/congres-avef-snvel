Package.describe({
  name: 'pierreeric:logger',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  const shared = ['ecmascript', 'es5-shim'];
  api.use(shared);
  api.imply(shared);
  api.addFiles('logger.js');
  api.export('Logger');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('pierreeric:logger');
  api.addFiles('logger-tests.js');
});
