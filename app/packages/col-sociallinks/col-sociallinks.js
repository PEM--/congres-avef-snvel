// Options used on the server and the client
const sharedOptions = {
  name: 'SocialLinks',
  schema: {
    title: { type: String, label: 'Réseau social', max: 256 },
    url: { type: String, label: 'URL', max: 256 },
    order: { type: Number, label: 'Ordonnancement', min: 1, max: 256, unique: true },
    faIcon: { type: String, label: 'Icone', min: 1, max: 32 }
  },
  // Available subscriptions and publications
  subs: {
    All: { options: {sort: {order: 1} } }
  }
};

// Client only
if (Meteor.isClient) {
  class SocialLinks extends SD.Structure.BaseCollection {}
  // Export instance
  SD.Structure.socialLinks = new SocialLinks(sharedOptions);
}

// Server only
if (Meteor.isServer) {
  // Options used only on the server
  const serverOptions = {
    // Options specific to server
    defaults: Meteor.settings.public.socialLinks,
    // Set indexes on collection
    indexes: { title: 1, url: 1, order: 1 }
  };
  class SocialLinks extends SD.Structure.ServerBaseCollection {}
  // Export instance
  SD.Structure.socialLinks = new SocialLinks(sharedOptions, serverOptions);
}
