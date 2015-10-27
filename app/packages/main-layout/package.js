Package.describe({
  name: 'pierreeric:main-layout',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react',
    'underscore',
    'momentjs:moment',
    'spacedrop:namespaces',
    'pierreeric:client-cookie',
    'pierreeric:client-menu',
    'pierreeric:client-footer',
    'blaze-html-templates',
    'kadira:dochead@1.3.0',
    'flemay:less-autoprefixer@1.2.0',
    'pierreeric:logger',
    'pierreeric:col-dictionary',
    'pierreeric:col-sociallinks'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'index.html',
    'main-layout.jsx',
    'main-layout.less'
  ]);
});
