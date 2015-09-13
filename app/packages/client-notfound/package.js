Package.describe({
  name: 'pierreeric:client-notfound',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.1.0.3');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react',
    'kadira:react-layout@1.3.0',
    'pierreeric:namespaces',
    'pierreeric:logger',
    'pierreeric:routing',
    'pierreeric:client-basicpages'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-notfound.jsx'
  ]);
});