Package.describe({
  name: 'pierreeric:client-googlemap',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'spacebars',
    'blaze-html-templates',
    'flemay:less-autoprefixer@1.1.0',
    'dburles:google-maps@1.1.4',
    'mquandalle:jade@0.4.3_1',
    'pierreeric:basereactmeteor',
    'pierreeric:client-sharedstyles',
    'pierreeric:routing-start'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'BlazeContainerMap.tpl.jade',
    'client-googlemap.jsx',
    'client-googlemap.less'
  ]);
});
