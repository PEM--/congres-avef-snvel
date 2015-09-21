
// @TODO https://github.com/andrewreedy/meteor-collection-setup/blob/master/src/CollectionSetup.js

// Create a logger
const log = Logger.createLogger('Collection SocialLinks');

// Social links
Col.SS.SocialLinks = new SimpleSchema({
  title: {
    type: String,
    label: 'Réseau social',
    max: 256
  },
  url: {
    type: String,
    label: 'URL',
    max: 256
  },
  order: {
    type: Number,
    label: 'Ordonnancement',
    min: 1,
    max: 256,
    unique: true
  },
  faIcon: {
    type: String,
    label: 'Icone',
    min: 1,
    max: 256,
    unique: true
  }
});
Col.SocialLinks = new Mongo.Collection('socialLinks');
Col.SocialLinks.attachSchema(Col.SS.SocialLinks);
log.info('Declared');

// Collection helpers
const METEOR_METHOD_NAME_SUB_ALL_LINKS = 'SocialLinksAll';
_.extend(Col.SocialLinks, {
  // Subscribe to all social links
  subAllLinks(cb) {
    return globalSubs.subscribe(METEOR_METHOD_NAME_SUB_ALL_LINKS, cb);
  }
});

// Server only
if (Meteor.isServer) {
  // Fill the links collection depending on the setting's content
  Meteor.settings.public.socialLinks.map(function(link) {
    const key = Object.keys(link)[0];
    const content = link[key];
    const dbLink = Col.SocialLinks.findOne({url: content.url});
    if (!dbLink) {
      Col.SocialLinks.insert({
        title: key,
        url: content.url,
        order: Col.SocialLinks.find().count() + 1,
        faIcon: content.faIcon
      });
      log.info(key, 'filled');
    }
  });
  // Publish all BasicPages without their content
  Meteor.publish(METEOR_METHOD_NAME_SUB_ALL_LINKS, function(cb) {
    check(cb, Match.Any);
    return Col.SocialLinks.find();
  });
  log.info('Published');
}
