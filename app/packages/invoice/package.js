Package.describe({
  name: 'pierreeric:invoice',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  const shared = [
    'ecmascript',
    'es5-shim',
    'underscorestring:underscore.string@3.2.2',
    'pierreeric:internationalization'
  ];
  api.use(shared);
  api.imply(shared);
  api.addFiles('invoice.js');
  api.export('renderInvoice');
});
