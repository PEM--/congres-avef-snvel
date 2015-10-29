globalSubManager = new SubsManager();

SharedTablesDefinition = [
  {
    name: 'Users',
    conf: {
      title: 'Inscrits',
      icon: 'user',
      collection: Meteor.users,
      extraFields: ['roles'],
      columns: [
        {data: 'emails[0].address', title: 'Email'},
        {data: 'profile.lastName', title: 'Nom'},
        {data: 'profile.firstName', title: 'Prénom'},
        {data: 'profile.snvel', title: 'N° SNVEL'},
        {data: 'profile.avef', title: 'N° AVEF'},
        {
          data: 'createdAt', title: 'Crée le', render(val) {
            return moment(val).format('DD/MM/YYYY HH:mm');
          }
        }
      ]
    }
  }, {
    name: 'Subscribers',
    conf: {
      title: 'Adhérents',
      icon: 'user-md',
      collection: SD.Structure.subscribers.collection,
      columns: [
        {data: 'userInfo.lastName', title: 'Nom'},
        {data: 'userInfo.firstName', title: 'Prénom'},
        {data: 'userInfo.email', title: 'Email'},
        {data: 'userInfo.snvel', title: 'N° SNVEL'},
        {data: 'userInfo.avef', title: 'N° AVEF'}
      ]
    }
  }, {
    name: 'Programs',
    conf: {
      title: 'Programmes & Sessions',
      icon: 'calendar',
      collection: SD.Structure.programs.collection,
      extraFields: ['programs[0]', 'programs[1]', 'programs[3]'],
      columns: [
        {data: 'session', title: 'Session'},
        {data: 'conference', title: 'Conférence'},
        {data: 'day', title: 'Jour'},
        {data: 'begin', title: 'Début'},
      ]
    }
  }, {
    name: 'Products',
    conf: {
      title: 'Produits',
      icon: 'industry',
      collection: SD.Structure.products.collection,
      columns: [
        {data: 'name', title: 'Nom'}
      ]
    }
  }, {
    name: 'Pricings',
    conf: {
      title: 'Prix et droits',
      icon: 'credit-card',
      collection: SD.Structure.pricings.collection,
      columns: [
        {data: 'right', title: 'Nom'},
        {data: 'basic.amount', title: 'Vét', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'avef.amount', title: 'Adh AVEF', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'snvel.amount', title: 'Adh SNVEL', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'snvelDelegate.amount', title: 'Dél SNVEL', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'seniorJuniorVetCcp.amount', title: 'Junior/Senior/CCP', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'nurseDentistSmith.amount', title: 'ASV/Dentiste/Maréchal', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'junior.amount', title: 'Junior', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }}
      ]
    }
  }, {
    name: 'Discounts',
    conf: {
      title: 'Règles des remises',
      icon: 'gift',
      collection: SD.Structure.discounts.collection,
      columns: [
        {data: 'right', title: 'Droits applicables'},
        {data: 'basic', title: 'Vét', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'avef', title: 'Adh AVEF', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'snvel', title: 'Adh SNVEL', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'snvelDelegate', title: 'Dél SNVEL', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'seniorJuniorVetCcp', title: 'Junior/Senior/CCP', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'nurseDentistSmith', title: 'ASV/Dentiste/Maréchal', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }},
        {data: 'junior', title: 'Junior', searcheable: false, render(val) {
          return numeral(val).format('0,0 $');
        }}
      ]
    }
  }, {
    name: 'Partners',
    conf: {
      title: 'Partenaires',
      icon: 'diamond',
      collection: SD.Structure.partners.collection,
      columns: [
        {data: 'title', title: 'Nom'}
      ]
    }
  }, {
    name: 'SocialLinks',
    conf: {
      title: 'Partages sociaux',
      icon: 'share-alt',
      collection: SD.Structure.socialLinks.collection,
      columns: [
        {data: 'title', title: 'Nom'}
      ]
    }
  }, {
    name: 'BasicPages',
    conf: {
      title: 'Pages dynamiques',
      icon: 'file-text-o',
      collection: SD.Structure.basicPages.collection,
      columns: [
        {data: 'title', title: 'Titre'}
      ]
    }
  }, {
    name: 'Texts',
    conf: {
      title: 'Textes dynamiques',
      icon: 'pencil-square-o',
      collection: SD.Structure.texts.collection,
      columns: [
        {data: 'page', title: 'Page'},
        {data: 'text', title: 'Texte'}
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
    extraFields: def.conf.extraFields ? def.conf.extraFields : [],
    columns: def.conf.columns,
    stateSave: true
  });
  console.log('Tabular declared', def.name);
});
