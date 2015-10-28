Package.describe({
  name: 'pierreeric:main-layout',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react',
    'underscore',
    'mquandalle:jade@0.4.5',
    'momentjs:moment',
    'spacedrop:namespaces',
    'pierreeric:client-cookie',
    'pierreeric:client-menu',
    'pierreeric:client-footer',
    'blaze-html-templates',
    'kadira:dochead@1.3.0',
    'pierreeric:logger',
    'pierreeric:col-dictionary',
    'pierreeric:col-sociallinks'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'index.jade',
    'main-layout.jsx'
  ]);
});
