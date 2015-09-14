Package.describe({
  name: 'pierreeric:markdown-server-side',
  version: '0.3.5'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('METEOR@1.2-rc.14');
  // NPM dependencies
  Npm.depends({
    'marked': '0.3.5',
    'highlight.js': '8.8.0'
  });
  // Included files in this packages
  // Server only
  api.addFiles([
    'markdown-server-side.js'
  ], 'server');
  // Exported symbols outside the scope of this package
  // Server only
  api.export(['marked'], 'server');
});
