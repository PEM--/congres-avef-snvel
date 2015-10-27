Package.describe({
  name: 'pierreeric:col-pricings',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'underscore',
    'underscorestring:underscore.string@3.2.2'
  ];
  api.use(shared.concat([
    'spacedrop:basecollection'
  ]));
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'col-pricings.js',
  ]);
  api.addAssets(['pricings.csv'], 'server');
});
