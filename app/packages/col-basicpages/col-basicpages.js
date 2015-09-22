// Options used on the server and the client
const options = {
  name: 'BasicPages',
  schema: {
    title: { type: String, label: 'Titre', min: 4, max: 256 },
    url: { type: String, label: 'URL', min: 3, max: 32 },
    order: { type: Number, label: 'Ordonnancement', min: 1, max: 256, unique: true },
    display: {
      type: String, label: 'Affichage', defaultValue: 'Aucun',
      allowedValues: ['Aucun', 'Menu', 'Footer', 'Menu et Footer']
    },
    content: { type: String, label: 'Contenu' }
  },
  // Available subscriptions and publications
  subs: {}
};

// Client only
if (Meteor.isClient) {
  class BasicPages extends Col.BaseCollection {}
  // Export instance
  Col.basicPages = new BasicPages(options);
}

// Server only
if (Meteor.isServer) {
  class BasicPages extends Col.ServerBaseCollection {}
  // Export instance
  Col.basicPages = new BasicPages(options, {
    // @TODO Create a Markdown importer in a specific 'legal' package, server only
    // Options specific to server
    defaults: [
      {
        title: 'Mentions légales', url: 'legal', order: 1, display: 'Footer',
        content: 'Yo' //marked('Les mentions légales, personne ne les lit...')
      },
      {
        title: 'Confidentialité', url: 'cookie', order: 2, display: 'Footer',
        content: 'Bro' //marked('La confidentialité est un mythe...')
      },
      {
        title: 'Not found', url: 'notfound', order: 3, display: 'Aucun',
        content: 'Gus' //marked('On ne trouve rien sans recherche...')
      }
    ],
    // Set indexes on collection
    indexes: {
      url: 1,
      order: 1
    }
  });
}


// @TODO Create a subscription / publication pattern

// Collection helpers
const SUB_ALL_LINKS = 'BasicPagesPageTitles';
const SINGLE_PAGE = 'BasicPagesSingle';
_.extend(Col.basicPages, {
  // Subscribe to all page's links
  subAllLinks(cb) {
    return globalSubs.subscribe(SUB_ALL_LINKS, cb);
  },
  // Subscribe to a single page
  subPage(url, cb) {
    return globalSubs.subscribe(SINGLE_PAGE, url, cb);
  }
});

// Server only
if (Meteor.isServer) {
  // Publish all BasicPages without their content
  Meteor.publish(SUB_ALL_LINKS, function(cb) {
    check(cb, Match.Any);
    return Col.basicPages.collection.find();
  });
  // Publish one BasicPage with its content
  Meteor.publish(SINGLE_PAGE, function(url, cb) {
    check(url, Col.basicPages.schema.getDefinition('url').type);
    check(cb, Match.Any);
    return Col.basicPages.collection.find({url: url});
  });
  // log.info('Published');
}
