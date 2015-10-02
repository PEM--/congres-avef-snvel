// Options used on the server and the client
const sharedOptions = {
  name: 'Texts',
  schema: {
    page: { type: String, label: 'Page', min: 2, max: 128 },
    text: { type: String, label: 'Texte', min: 2, max: 128 },
    content: { type: String, label: 'Contenu' }
  },
  // Available subscriptions and publications
  subs: {
    WithPageWithText: { query: ['page', 'text'] }
  }
};

// Client only
if (Meteor.isClient) {
  class Texts extends SD.Structure.BaseCollection {}
  // Export instance
  SD.Structure.texts = new Texts(sharedOptions);
}

// Server only
if (Meteor.isServer) {
  // Options used only on the server
  const serverOptions = {
    defaults: ALL_TEXTS,
    // Set indexes on collection
    indexes: { page: 1, text: 1 }
  };
  class Texts extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.texts = new Texts(sharedOptions, serverOptions);
}
