Package.describe({
  name: 'useraccounts:flow-ssr-react',
  version: '1.12.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use([
    'check',
    'kadira:react-layout',
    'kadira:flow-router-ssr',
    'underscore',
    'useraccounts:core'
  ], ['client', 'server']);

  api.imply([
    'kadira:react-layout@1.3.1',
    'kadira:flow-router-ssr@3.3.0',
    'useraccounts:core@1.12.3'
  ], ['client', 'server']);

  api.addFiles([
    'lib/core.js',
    'lib/client/client.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/templates_helpers/at_input.js'
  ], ['client']);
});
