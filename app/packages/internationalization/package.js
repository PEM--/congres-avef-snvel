Package.describe({
  name: 'pierreeric:internationalization',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.0.2');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'softwarerero:accounts-t9n@1.1.4',
    'tap:i18n@1.6.1',
    'gwendall:simple-schema-i18n@0.1.9',
    'rzymek:moment-locale-fr@2.9.0',
    'numeral:languages@1.5.3'
  ];
  api.use([
    'pierreeric:logger'
  ].concat(shared));
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'internationalization.js'
  ]);
  api.addAssets([
    'package-tap.i18n',
    'i18n/fr.i18n.json'
  ], ['client', 'server']);
  // Exporting symbols
  api.export(['getUserLanguage']);
});
