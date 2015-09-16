Package.describe({
  name: 'pierreeric:subscription-cache',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('METEOR@1.2-rc.15');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'meteorhacks:subs-manager@1.6.2',
    'pierreeric:namespaces',
    'pierreeric:logger'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'subscription-cache.js',
  ]);
  // Exported symbols outside the scope of this package
  api.export(['SubsManager', 'globalSubs']);
});
