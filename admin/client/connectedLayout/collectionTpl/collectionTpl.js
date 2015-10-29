Template.dashboard.onRendered(function() {
  const title = _.findWhere(SharedTablesDefinition, {name: 'Users'}).conf.title;
  $('.main-title').children().text(title);
});
