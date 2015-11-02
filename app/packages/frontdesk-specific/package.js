Package.describe({
  name: 'pierreeric:frontdesk-specific',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  Cordova.depends({
    'phonegap-plugin-barcodescanner': '4.1.0',
    'cordova-plugin-tts': '0.2.3'
  });
  api.use([
    'es5-shim',
    'ecmascript',
    'jquery'
  ]);
});
