
// @TODO https://github.com/andrewreedy/meteor-collection-setup/blob/master/src/CollectionSetup.js

// Create a logger
const log = Logger.createLogger('Collection BasicPages');

// Basic pages
Col.SS.BasicPages = new SimpleSchema({
  title: {
    type: String,
    label: 'Titre',
    max: 256
  },
  url: {
    type: String,
    label: 'URL',
    max: 32
  },
  order: {
    type: Number,
    label: 'Ordonnancement',
    min: 1,
    max: 256,
    unique: true
  },
  display: {
    type: String,
    label: 'Affichage',
    defaultValue: 'Aucun',
    allowedValues: ['Aucun', 'Menu', 'Footer', 'Menu et Footer']
  },
  content: {
    type: String,
    label: 'Contenu'
  }
});
Col.BasicPages = new Mongo.Collection('basicPages');
Col.BasicPages.attachSchema(Col.SS.BasicPages);
log.info('Declared');

// Collection helpers
const METEOR_METHOD_NAME_SUB_ALL_LINKS = 'BasicPagesPageTitles';
const METEOR_METHOD_NAME_SUB_PAGE = 'BasicPagesSingle';
_.extend(Col.BasicPages, {
  // Subscribe to all page's links
  subAllLinks(cb) {
    return globalSubs.subscribe(METEOR_METHOD_NAME_SUB_ALL_LINKS, cb);
  },
  // Subscribe to a single page
  subPage(url, cb) {
    return globalSubs.subscribe(METEOR_METHOD_NAME_SUB_PAGE, url, cb);
  }
});

// Server only
if (Meteor.isServer) {
  // Fill the links collection with a minimal set of links
  if (Col.BasicPages.find().count() !== 0) {
    log.info('Already filled');
  } else {
    Col.BasicPages.insert({
      title: 'Mentions légales', url: 'legal', order: 1, display: 'Footer',
      content: marked('Les mentions légales, personne ne les lit...')
    });
    Col.BasicPages.insert({
      title: 'Confidentialité', url: 'cookie', order: 2, display: 'Footer',
      content: marked('La confidentialité est un mythe...')
    });
    Col.BasicPages.insert({
      title: 'Not found', url: 'notfound', order: 3, display: 'Aucun',
      content: marked('On ne trouve rien sans recherche...')
    });
    log.info('Filled with defaults');
  }
  // Publish all BasicPages without their content
  Meteor.publish(METEOR_METHOD_NAME_SUB_ALL_LINKS, function(cb) {
    check(cb, Match.Any);
    return Col.BasicPages.find();
  });
  // Publish one BasicPage with its content
  Meteor.publish(METEOR_METHOD_NAME_SUB_PAGE, function(url, cb) {
    // check(url, String);
    check(url, Col.SS.BasicPages.getDefinition('url').type);
    check(cb, Match.Any);
    return Col.BasicPages.find({url: url});
  });
  log.info('Published');
}
