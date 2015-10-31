Package.describe({
  name: 'pierreeric:frontdesk-specific',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  api.use([
    'es5-shim',
    'ecmascript',
    'jquery'
  ]);
  // Included files in this packages
  api.addFiles('frontdesk-specific.js', 'web.cordova');
});
