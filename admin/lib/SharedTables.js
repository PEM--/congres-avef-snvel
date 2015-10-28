SharedTables = {
  Users: new Tabular.Table({
    name: 'Users',
    collection: Meteor.users,
    columns: [{
      data: 'emails', title: 'Email', render(val, type, doc) {
        const user = Meteor.users.findOne(doc._id);
        console.log('user', user, doc);
        return user.emails[0].address;
      }
    }, {
      data: 'createdAt', title: 'Crée le', render(val) {
        return moment(val).format('DD/MM/YYYY HH:mm');
      }
    }]
  }),
  BasicPages: new Tabular.Table({
    name: 'BasicPages',
    collection: SD.Structure.basicPages.collection,
    columns: [
      {data: 'title', label: 'Titre'}
    ]
  })
};
console.log('Tabular declared');
