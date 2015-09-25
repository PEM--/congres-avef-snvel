// Options used on the server and the client
const sharedOptions = {
  name: 'Partners',
  schema: {
    title: { type: String, label: 'Titre', min: 4, max: 256 },
    url: { type: String, label: 'URL', min: 3, max: 256 },
    src: { type: String, label: 'URL', min: 3, max: 256 },
    order: { type: Number, label: 'Ordonnancement', min: 1, max: 256, unique: true },
  },
  // Available subscriptions and publications
  subs: {
    All: { options: {sort: {order: 1} } }
  }
};
// Options used only on the server
const serverOptions = {
  defaults: [
    {
      title: 'AVEF', url: 'http://www.avef.fr',
      src: '/img/avef.svg', order: 1
    },
    {
      title: 'SNVEL', url: 'http://www.snvel.fr',
      src: '/img/snvel.svg', order: 2
    },
  ]
};


// Client only
if (Meteor.isClient) {
  class Partners extends Col.BaseCollection {}
  // Export instance
  Col.partners = new Partners(sharedOptions);
}

// Server only
if (Meteor.isServer) {
  class Partners extends Col.ServerBaseCollection {}
  // Export instance
  Col.partners = new Partners(sharedOptions, serverOptions);
}
