// Options used on the server and the client
const options = {
  name: 'SocialLinks',
  schema: {
    title: { type: String, label: 'Réseau social', max: 256 },
    url: { type: String, label: 'URL', max: 256 },
    order: { type: Number, label: 'Ordonnancement', min: 1, max: 256, unique: true },
    faIcon: { type: String, label: 'Icone', min: 1, max: 32 }
  },
  // Set indexes on collection
  indexes: {
    url: 1, order: 1
  },
  // Available subscriptions and publications
  subs: {
    AllLinks: { options: {sort: {order: 1} } }
  }
};

// Client only
if (Meteor.isClient) {
  class SocialLinks extends Col.BaseCollection {}
  // Export instance
  Col.socialLinks = new SocialLinks(options);
}

// Server only
if (Meteor.isServer) {
  class SocialLinks extends Col.ServerBaseCollection {}
  // Export instance
  Col.socialLinks = new SocialLinks(options, {
    // Options specific to server
    defaults: Meteor.settings.public.socialLinks
  });
}
