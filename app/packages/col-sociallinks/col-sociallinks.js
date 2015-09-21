// Options used on the server and the client
let options = {
  name: 'SocialLinks',
  schema: {
    title: { type: String, label: 'Réseau social', max: 256 },
    url: { type: String, label: 'URL', max: 256 },
    order: { type: Number, label: 'Ordonnancement', min: 1, max: 256, unique: true },
    faIcon: { type: String, label: 'Icone', min: 1, max: 32 }
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

// Collection helpers
const SUB_ALL_LINKS = 'SocialLinksAll';
_.extend(Col.socialLinks, {
  // Subscribe to all social links
  subAllLinks(cb) {
    return globalSubs.subscribe(SUB_ALL_LINKS, cb);
  }
});

// Server only
if (Meteor.isServer) {
  // Publish all social links
  Meteor.publish(SUB_ALL_LINKS, function(cb) {
    check(cb, Match.Any);
    return Col.socialLinks.collection.find();
  });
  // @TODO log.info('Published');
}
