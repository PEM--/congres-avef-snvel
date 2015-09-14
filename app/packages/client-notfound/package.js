Package.describe({
  name: 'pierreeric:client-notfound',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('METEOR@1.2-rc.14');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react',
    'kadira:react-layout@1.3.0',
    'pierreeric:namespaces',
    'pierreeric:logger',
    'pierreeric:routing-start',
    'pierreeric:client-basicpages'
  ]);
  // Included files in this packages
  // Files for server and client
  api.addFiles([
    'client-notfound.jsx'
  ]);
});
