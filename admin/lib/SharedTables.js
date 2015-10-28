SharedTables = {};

SharedTables.Users = new Tabular.Table({
  name: 'Users',
  collection: Meteor.users,
  columns: [
    {data: 'createdAt', title: 'Crée le'}
  ]
});

SharedTables.BasicPages = new Tabular.Table({
  name: 'BasicPages',
  collection: SD.Structure.basicPages.collection,
  columns: [
    {data: 'title', label: 'Titre'}
  ]
});

console.log('Tabular declared');
