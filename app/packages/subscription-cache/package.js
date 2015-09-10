Package.describe({
  name: 'pierreeric:subscription-cache',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'meteorhacks:subs-manager'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'subscription-cache.js',
  ]);
  // Exported symbols outside the scope of this package
  api.export(['SubsManager', 'globalSubs']);
});
