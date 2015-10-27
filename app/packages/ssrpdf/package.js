Package.describe({
  name: 'pierreeric:ssrpdf',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // NPM dependencies
  Npm.depends({
    'domino': '1.0.19',
  });
  // Dependencies of this package
  //Server only
  api.use([
    'ecmascript',
    'es5-shim',
    'coffeescript',
    'pascoual:pdfkit@1.0.7',
    'underscorestring:underscore.string@3.2.2',
    'spacedrop:namespaces',
    'pierreeric:logger',
    'pierreeric:col-basicpages',
    'pierreeric:markdown'
  ]);
  // Included files in this packages
  api.addFiles([
    'ssrpdf.coffee'
  ], 'server');
});
