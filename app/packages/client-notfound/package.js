Package.describe({
  name: 'pierreeric:client-notfound',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'react@0.14.1_1',
    'kadira:react-layout@1.5.2',
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
