Package.describe({
  name: 'pierreeric:footer',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use([
    'react',
    'flemay:less-autoprefixer@1.1.0',
  ], 'client');
  api.addFiles([
    'footer.jsx',
    'footer.less'
  ], 'client');
  api.export(['Footer'], 'client');
});
