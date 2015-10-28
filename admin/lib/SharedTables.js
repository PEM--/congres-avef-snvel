globalSubManager = new SubsManager();

SharedTablesDefinition = [
  {
    name: 'Users',
    conf: {
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
    }
  }, {
    name: 'BasicPages',
    conf: {
      title: 'Pages dynamiques',
      icon: 'file-text-o',
      collection: SD.Structure.basicPages.collection,
      columns: [
        {data: 'title', label: 'Titre'}
      ]
    }
  }, {
    name: 'Discounts',
    conf: {
      title: 'Règles des remises',
      icon: 'gift',
      collection: SD.Structure.discounts.collection,
      columns: [
        {data: 'right', label: 'Droits applicables'}
      ]
    }
  }, {
    name: 'Partners',
    conf: {
      title: 'Partenaires',
      icon: 'diamond',
      collection: SD.Structure.partners.collection,
      columns: [
        {data: 'title', label: 'Nom'}
      ]
    }
  }, {
    name: 'Pricings',
    conf: {
      title: 'Prix et droits',
      icon: 'credit-card',
      collection: SD.Structure.pricings.collection,
      columns: [
        {data: 'right', label: 'Nom'}
      ]
    }
  }, {
    name: 'Products',
    conf: {
      title: 'Produits',
      icon: 'industry',
      collection: SD.Structure.products.collection,
      columns: [
        {data: 'name', label: 'Nom'}
      ]
    }
  }, {
    name: 'Programs',
    conf: {
      title: 'Programmes & Sessions',
      icon: 'calendar',
      collection: SD.Structure.programs.collection,
      columns: [
        {data: 'session', label: 'Session'}
      ]
    }
  }, {
    name: 'SocialLinks',
    conf: {
      title: 'Partages sociaux',
      icon: 'share-alt',
      collection: SD.Structure.socialLinks.collection,
      columns: [
        {data: 'title', label: 'Nom'}
      ]
    }
  }, {
    name: 'Subscribers',
    conf: {
      title: 'Adhérents',
      icon: 'user-md',
      collection: SD.Structure.subscribers.collection,
      columns: [
        {data: 'userInfo', label: 'Nom'}
      ]
    }
  }, {
    name: 'Texts',
    conf: {
      title: 'Textes dynamiques',
      icon: 'pencil-square-o',
      collection: SD.Structure.texts.collection,
      columns: [
        {data: 'page', label: 'Page'},
        {data: 'text', label: 'Texte'}
      ]
    }
  }
];

SharedTables = {};
SharedTablesDefinition.forEach(def => {
  SharedTables[def.name] = new Tabular.Table({
    name: def.name,
    sub: globalSubManager,
    allow(userId) { return Roles.userIsInRole(userId, 'admin'); },
    collection: def.conf.collection,
    columns: def.conf.columns
  });
  console.log('Tabular declared', def.name);
});
