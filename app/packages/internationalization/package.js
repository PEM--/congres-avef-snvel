Package.describe({
  name: 'pierreeric:internationalization',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  const shared = [
    'underscore',
    'templating',
    'tap:i18n@1.7.0',
    'aldeed:simple-schema@1.3.3',
    'softwarerero:accounts-t9n@1.1.4',
    'rzymek:moment-locale-fr@2.9.0',
    'numeral:numeral@1.5.3_1'
  ];
  api.use([
    'pierreeric:logger'
  ].concat(shared));
  api.imply(shared);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'internationalization.js',
    'i18n/fr.i18n.json'
  ]);
  api.addAssets([
    'package-tap.i18n'
  ], ['client', 'server']);
  // Exporting symbols
  api.export(['getUserLanguage', 'numeralAmountFormat']);
});
