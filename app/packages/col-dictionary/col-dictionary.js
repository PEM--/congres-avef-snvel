// Options used on the server and the client
const sharedOptions = {
  name: 'Dictionary',
  schema: {
    title: { type: String, label: 'Titre', min: 5, max: 256 },
    shortTitle: { type: String, label: 'Titre court', min: 5, max: 32 },
    msTileColor: { type: String, label: 'Couleur des tuiles Microsoft', min: 7, max: 7}
  },
  // Available subscriptions and publications
  subs: {
    AllLinks: {}
  }
};

// Client only
if (Meteor.isClient) {
  class Dictionary extends SD.Structure.BaseCollection {}
  // Export instance
  SD.Structure.dictionary = new Dictionary(sharedOptions);
}

// Server only
if (Meteor.isServer) {
  // Options used only on the server
  const serverOptions = {
    defaults: [Meteor.settings.public.dictionary]
  };
if (Meteor.isServer) {
  class Dictionary extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.dictionary = new Dictionary(sharedOptions, serverOptions);
}
