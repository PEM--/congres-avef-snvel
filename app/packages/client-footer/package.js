Package.describe({
  name: 'pierreeric:client-footer',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('METEOR@1.2-rc.14');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react',
    'ecmascript',
    'pierreeric:namespaces',
    'pierreeric:logger',
    'flemay:less-autoprefixer@1.1.0',
    'pierreeric:col-basicpages',
    'pierreeric:col-sociallinks',
    'pierreeric:client-sharedstyles'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'logger.js',
    'client-footer-basicpages.jsx',
    'client-footer-sociallinks.jsx',
    'client-footer.jsx',
    'client-footer.less'
  ]);
});
