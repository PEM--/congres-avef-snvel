Package.describe({
  name: 'pierreeric:main-layout',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.1');
  // Dependencies of this package
  // Dependencies for server and client
  var sharedDeps = [
    'pierreeric:namespaces',
    'pierreeric:logger',
    'pierreeric:client-footer'
  ];
  api.use([
    'blaze-html-templates',
    'react',
    'kadira:dochead@1.1.0',
    'flemay:less-autoprefixer@1.1.0'
  ].concat(sharedDeps));
  // Expose packages
  api.imply(sharedDeps);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'index.html',
    'main-layout.jsx',
    'main-layout.less'
  ]);
});
