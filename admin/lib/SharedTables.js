globalSubManager = new SubsManager();

SharedTablesDefinition = {
  Users: {
    title: 'Inscrits',
    icon: 'user',
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
  },
  BasicPages: {
    title: 'Pages dynamiques',
    icon: 'file-text-o',
    collection: SD.Structure.basicPages.collection,
    columns: [
      {data: 'title', label: 'Titre'}
    ]
  },
  Discounts: {
    title: 'Règles des remises',
    icon: 'gift',
    collection: SD.Structure.discounts.collection,
    columns: [
      {data: 'right', label: 'Droits applicables'}
    ]
  },
  Partners: {
    title: 'Partenaires',
    icon: 'diamond',
    collection: SD.Structure.partners.collection,
    columns: [
      {data: 'title', label: 'Nom'}
    ]
  },
  Pricings: {
    title: 'Prix et droits',
    icon: 'credit-card',
    collection: SD.Structure.pricings.collection,
    columns: [
      {data: 'right', label: 'Nom'}
    ]
  },
  Products: {
    title: 'Produits',
    icon: 'industry',
    collection: SD.Structure.products.collection,
    columns: [
      {data: 'name', label: 'Nom'}
    ]
  },
  Programs: {
    title: 'Programmes & Sessions',
    icon: 'calendar',
    collection: SD.Structure.programs.collection,
    columns: [
      {data: 'session', label: 'Session'}
    ]
  },
  SocialLinks: {
    title: 'Partages sociaux',
    icon: 'share-alt',
    collection: SD.Structure.socialLinks.collection,
    columns: [
      {data: 'title', label: 'Nom'}
    ]
  },
  Subscribers: {
    title: 'Adhérents',
    icon: 'user-md',
    collection: SD.Structure.subscribers.collection,
    columns: [
      {data: 'userInfo', label: 'Nom'}
    ]
  },
  Texts: {
    title: 'Textes dynamiques',
    icon: 'pencil-square-o',
    collection: SD.Structure.texts.collection,
    columns: [
      {data: 'page', label: 'Page'},
      {data: 'text', label: 'Texte'}
    ]
  }
};

SharedTables = {};
Object.keys(SharedTablesDefinition).forEach(key => {
  SharedTables[key] = new Tabular.Table({
    name: key,
    sub: globalSubManager,
    allow(userId) { return Roles.userIsInRole(userId, 'admin'); },
    collection: SharedTablesDefinition[key].collection,
    columns: SharedTablesDefinition[key].columns
  });
  console.log('Tabular declared', key);
});
