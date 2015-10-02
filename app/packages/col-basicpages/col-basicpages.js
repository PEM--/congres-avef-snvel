// Options used on the server and the client
const sharedOptions = {
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
  subs: {
    AllPages: {},
    FooterLinks: {
      filter: { display: {$in: ['Footer', 'Menu et Footer']} },
      options: {sort: {order: 1} }
    },
    WithUrl: { query: ['url'] }
  }
};

// Client only
if (Meteor.isClient) {
  class BasicPages extends SD.Structure.BaseCollection {}
  // Export instance
  SD.Structure.basicPages = new BasicPages(sharedOptions);
}

// Server only
if (Meteor.isServer) {
  // Options used only on the server
  const serverOptions = {
    defaults: [
      {
        title: 'Mentions légales', url: 'legal', order: 1, display: 'Menu et Footer',
        content: DEFAULT_LEGAL
      },
      {
        title: 'Confidentialité', url: 'cookie', order: 2, display: 'Menu et Footer',
        content: DEFAULT_COOKIE
      },
      {
        title: 'Conditions générales de ventes', url: 'cgv', order: 3, display: 'Menu et Footer',
        content: DEFAULT_CGV
      },
      {
        title: 'Information non trouvée', url: 'notfound', order: 4, display: 'Aucun',
        content: DEFAULT_NOTFOUND
      }
    ],
    // Set indexes on collection
    indexes: { url: 1, display: 1, order: 1 }
  };
  class BasicPages extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.basicPages = new BasicPages(sharedOptions, serverOptions);
}
