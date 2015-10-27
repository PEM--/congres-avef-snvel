Package.describe({
  name: 'pierreeric:security',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'coffeescript',
    'browser-policy',
    'matteodem:easy-security@0.1.4',
    'spacedrop:namespaces',
    'pierreeric:logger'
  ]);
  api.addFiles([
    'logger.js',
    'browserPolicy.coffee',
    'rateLimiting.coffee'
  ], 'server');
});
