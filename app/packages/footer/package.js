Package.describe({
  name: 'pierreeric:footer',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use([
    'react'
  ], 'client');
  api.addFiles([
    'footer.jsx'
  ], 'client');
  api.export(['Footer'], 'client');
});
