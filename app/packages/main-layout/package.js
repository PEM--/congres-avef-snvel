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
    'react',
    'kadira:react-layout',
    'flemay:less-autoprefixer'
  ];
  api.use(sharedDeps);
  // Expose packages
  api.imply(sharedDeps);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'main-layout.jsx',
    'main-layout.less'
  ]);
  // Exported symbols outside the scope of this package
  api.export(['MainLayout']);
});
