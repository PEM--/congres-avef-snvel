Package.describe({
  name: 'pierreeric:client-notfound',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'kadira:react-layout@1.3.1',
    'pierreeric:logger',
    'pierreeric:routing-start',
    'pierreeric:main-layout',
    'pierreeric:client-basicpages'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-notfound.jsx'
  ]);
});
