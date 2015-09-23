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
  // Set indexes on collection
  indexes: {
    url: 1, display: 1, order: 1
  },
  // Available subscriptions and publications
  subs: {
    // @TODO Query filtering on menu and footer
    AllLinks: { options: {sort: {order: 1} } },
    WithUrl: { query: ['url'] }
  }
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
        title: 'Mentions légales', url: 'legal', order: 1, display: 'Menu et Footer',
        content: marked('Les mentions légales, personne ne les lit...')
      },
      {
        title: 'Confidentialité', url: 'cookie', order: 2, display: 'Menu et Footer',
        content: marked('La confidentialité est un mythe...')
      },
      {
        title: 'Conditions générales de ventes', url: 'cgu', order: 3, display: 'Menu et Footer',
        content: marked('On vend tout ce qu\'on peut...')
      },
      {
        title: 'Not found', url: 'notfound', order: 4, display: 'Aucun',
        content: marked('On ne trouve rien sans recherche...')
      }
    ],
    // Set indexes on collection
    indexes: {
      url: 1,
      order: 1
    }
  });
}
