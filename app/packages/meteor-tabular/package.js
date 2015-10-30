/* global Package, Npm */

Package.describe({
  name: 'pierreric:tabular-semanticui',
  summary: 'Datatables for large or small datasets in Meteor',
  version: '1.4.2',
  git: 'https://github.com/pierreric/meteor-tabular.git'
});

Npm.depends({
  datatables: '1.10.9'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.2');
  api.use([
    'check',
    'underscore',
    'mongo',
    'blaze',
    'templating',
    'reactive-var',
    'tracker',
    'es5-shim',
    'ecmascript',
    'mquandalle:jade@0.4.5'
  ]);

  // jquery is a weak reference in case you want to use a different package or
  // pull it in another way, but regardless you need to make sure it is loaded
  // before any tabular tables are rendered
  api.use(['jquery'], 'client', {weak: true});

  api.use(['meteorhacks:subs-manager@1.6.2'], ['client', 'server'], {weak: true});

  api.export('Tabular');

  api.addFiles('common.js');
  api.addFiles('server/tabular.js', 'server');
  api.addFiles([
    '.npm/package/node_modules/datatables/media/js/jquery.dataTables.js',
    'client/lib/dataTables.bootstrap.js',
    'client/tabular.tpl.jade',
    'client/util.js',
    'client/tableRecords.js',
    'client/tableInit.js',
    'client/pubSelector.js',
    'client/tabular.js'
  ], 'client');
});
