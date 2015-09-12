Package.describe({
  name: 'pierreeric:security',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use([
    'coffeescript',
    'browser-policy',
    'pierreeric:namespaces',
    'pierreeric:logger'
  ]);
  api.addFiles([
    'browserPolicy.coffee'
  ], 'server');
});
