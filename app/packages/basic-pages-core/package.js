Package.describe({
  name: 'pierreeric:basic-pages-core',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  var shared = ['aldeed:collection2'];
  api.use(['meteor-platform'].concat(shared));
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'basic-pages-core.js',
  ]);
  // Exported symbols outside the scope of this package
  api.export(['BasicPages', 'BasicPagesSchema']);
});
