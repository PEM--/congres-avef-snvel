Package.describe({
  name: 'pierreeric:namespaces',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('METEOR@1.2-rc.14');
  // Included files in this packages
  // Files for server and client
  api.addFiles('namespaces.js');
  // Exported symbols outside the scope of this package
  api.export(['Rc', 'Col', 'Tools']);
});
