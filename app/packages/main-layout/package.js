Package.describe({
  name: 'pierreeric:main-layout',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  var sharedDeps = [
    'pierreeric:namespaces',
    'pierreeric:logger',
    'pierreeric:client-footer'
  ];
  api.use([
    'react@0.1.10',
    'flemay:less-autoprefixer@1.1.0'
  ].concat(sharedDeps));
  // Expose packages
  api.imply(sharedDeps);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'main-layout.jsx',
    'main-layout.less'
  ]);
});
